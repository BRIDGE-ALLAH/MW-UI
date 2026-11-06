import { promises as fs } from "node:fs"
import os from "node:os"
import path from "node:path"

import { describe, expect, it } from "vitest"

import {
  cleanRegistryHealthHistory,
  loadRegistryHealthSnapshot,
  loadRegistryMonitorState,
  publishRegistryHealth,
} from "./blob"
import type {
  RegistryHealthSnapshot,
  RegistryMonitorRun,
  RegistryMonitorState,
} from "./schema"

const STATE: RegistryMonitorState = {
  schemaVersion: 1,
  scoreVersion: 1,
  updatedAt: "2026-08-24T12:00:00.000Z",
  registries: {},
}

const SNAPSHOT: RegistryHealthSnapshot = {
  schemaVersion: 1,
  scoreVersion: 1,
  generatedAt: "2026-08-24T12:00:00.000Z",
  globalMeans: {
    availability7d: 0.85,
    availability30d: 0.85,
    indexSchema: 0.9,
    itemValidity: 0.9,
    dryRun: 0.9,
  },
  registries: {},
}

const RUN: RegistryMonitorRun = {
  schemaVersion: 1,
  startedAt: "2026-08-24T12:00:00.000Z",
  completedAt: "2026-08-24T12:01:00.000Z",
  mode: "hourly",
  totals: {
    registries: 0,
    reachable: 0,
    unavailable: 0,
    challenges: 0,
    itemChecks: 0,
    dryRuns: 0,
  },
  results: {},
  diagnostics: [],
}

async function withDataDirectory(run: (dataDir: string) => Promise<void>) {
  const dataDir = await fs.mkdtemp(path.join(os.tmpdir(), "moonwitness-health-"))
  try {
    await run(dataDir)
  } finally {
    await fs.rm(dataDir, { recursive: true, force: true })
  }
}

describe("local registry health storage", () => {
  it("returns null when no state or snapshot has been published", async () => {
    await withDataDirectory(async (dataDir) => {
      await expect(loadRegistryMonitorState({ dataDir })).resolves.toBeNull()
      await expect(loadRegistryHealthSnapshot({ dataDir })).resolves.toBeNull()
    })
  })

  it("publishes and validates state and the latest snapshot", async () => {
    await withDataDirectory(async (dataDir) => {
      await publishRegistryHealth({
        state: STATE,
        snapshot: SNAPSHOT,
        run: RUN,
        dataDir,
      })

      await expect(loadRegistryMonitorState({ dataDir })).resolves.toEqual(
        STATE
      )
      await expect(loadRegistryHealthSnapshot({ dataDir })).resolves.toEqual(
        SNAPSHOT
      )
    })
  })

  it("rejects invalid stored snapshots", async () => {
    await withDataDirectory(async (dataDir) => {
      const latestPath = path.join(dataDir, "registry-health/v1/latest.json")
      await fs.mkdir(path.dirname(latestPath), { recursive: true })
      await fs.writeFile(
        latestPath,
        JSON.stringify({ ...SNAPSHOT, schemaVersion: 2 })
      )

      await expect(loadRegistryHealthSnapshot({ dataDir })).rejects.toThrow()
    })
  })

  it("keeps immutable run history and overwrites daily, state, and latest files", async () => {
    await withDataDirectory(async (dataDir) => {
      const result = await publishRegistryHealth({
        state: STATE,
        snapshot: SNAPSHOT,
        run: RUN,
        dataDir,
      })
      const root = path.join(dataDir, "registry-health/v1")

      await expect(
        fs.readFile(
          path.join(root, "runs/2026-08-24T12-00-00-000Z.json"),
          "utf8"
        )
      ).resolves.toContain('"mode":"hourly"')
      await expect(
        fs.readFile(path.join(root, "daily/2026-08-24.json"), "utf8")
      ).resolves.toContain('"date":"2026-08-24"')
      expect(result.latestPath).toBe("registry-health/v1/latest.json")

      await expect(
        publishRegistryHealth({
          state: STATE,
          snapshot: SNAPSHOT,
          run: RUN,
          dataDir,
        })
      ).rejects.toThrow()
    })
  })

  it("deletes expired run and daily history while preserving recent files", async () => {
    await withDataDirectory(async (dataDir) => {
      const runDirectory = path.join(dataDir, "registry-health/v1/runs")
      const dailyDirectory = path.join(dataDir, "registry-health/v1/daily")
      await fs.mkdir(runDirectory, { recursive: true })
      await fs.mkdir(dailyDirectory, { recursive: true })

      const oldRun = path.join(runDirectory, "old.json")
      const recentRun = path.join(runDirectory, "recent.json")
      const oldDaily = path.join(dailyDirectory, "old.json")
      await Promise.all(
        [oldRun, recentRun, oldDaily].map((file) => fs.writeFile(file, "{}"))
      )

      const now = new Date("2026-08-24T12:00:00.000Z")
      const oldTime = new Date("2026-08-01T00:00:00.000Z")
      await Promise.all([
        fs.utimes(oldRun, oldTime, oldTime),
        fs.utimes(oldDaily, oldTime, oldTime),
        fs.utimes(recentRun, now, now),
      ])

      const result = await cleanRegistryHealthHistory({ dataDir, now })

      expect(result.deleted).toBe(2)
      await expect(fs.access(oldRun)).rejects.toThrow()
      await expect(fs.access(oldDaily)).rejects.toThrow()
      await expect(fs.access(recentRun)).resolves.toBeUndefined()
    })
  })

  it("rejects aborted snapshot reads", async () => {
    await withDataDirectory(async (dataDir) => {
      const controller = new AbortController()
      controller.abort(new Error("cancelled"))

      await expect(
        loadRegistryHealthSnapshot({
          dataDir,
          abortSignal: controller.signal,
        })
      ).rejects.toThrow("cancelled")
    })
  })
})
