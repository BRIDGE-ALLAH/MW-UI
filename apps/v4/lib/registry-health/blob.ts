import { randomUUID } from "node:crypto"
import { promises as fs } from "node:fs"
import path from "node:path"

import {
  registryHealthSnapshotSchema,
  registryMonitorStateSchema,
  type RegistryHealthSnapshot,
  type RegistryMonitorRun,
  type RegistryMonitorState,
} from "./schema"

const STORAGE_PREFIX = "registry-health/v1"
const STATE_PATH = `${STORAGE_PREFIX}/state.json`
const LATEST_PATH = `${STORAGE_PREFIX}/latest.json`

function getDataDirectory(dataDir?: string) {
  return path.resolve(
    dataDir ??
      process.env.MOONWITNESS_DATA_DIR ??
      path.join(process.cwd(), ".moonwitness-data")
  )
}

function resolveStoragePath(dataDir: string | undefined, pathname: string) {
  const root = getDataDirectory(dataDir)
  const resolved = path.resolve(root, ...pathname.split("/"))
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
    throw new Error("Invalid registry health storage path.")
  }
  return resolved
}

async function readStoredJson(pathname: string, dataDir?: string) {
  try {
    return JSON.parse(
      await fs.readFile(resolveStoragePath(dataDir, pathname), "utf8")
    ) as unknown
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return null
    }
    throw error
  }
}

async function writeStoredJson(
  pathname: string,
  value: unknown,
  dataDir: string | undefined,
  allowOverwrite = false
) {
  const filePath = resolveStoragePath(dataDir, pathname)
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  const body = JSON.stringify(value)

  if (!allowOverwrite) {
    await fs.writeFile(filePath, body, { encoding: "utf8", flag: "wx" })
    return
  }

  const temporaryPath = `${filePath}.${process.pid}.${randomUUID()}.tmp`
  try {
    await fs.writeFile(temporaryPath, body, {
      encoding: "utf8",
      flag: "wx",
    })
    await fs.rename(temporaryPath, filePath)
  } catch (error) {
    await fs.rm(temporaryPath, { force: true }).catch(() => {})
    throw error
  }
}

async function listStoredFiles(prefix: string, dataDir?: string) {
  const directory = resolveStoragePath(dataDir, prefix)
  const files: { pathname: string; modifiedAt: Date }[] = []

  async function walk(currentDirectory: string) {
    let entries
    try {
      entries = await fs.readdir(currentDirectory, { withFileTypes: true })
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return
      }
      throw error
    }

    for (const entry of entries) {
      const fullPath = path.join(currentDirectory, entry.name)
      if (entry.isDirectory()) {
        await walk(fullPath)
        continue
      }
      if (!entry.isFile()) continue

      const stats = await fs.stat(fullPath)
      files.push({
        pathname: path.posix.join(
          prefix,
          path.relative(directory, fullPath).split(path.sep).join("/")
        ),
        modifiedAt: stats.mtime,
      })
    }
  }

  await walk(directory)
  return files
}

export async function loadRegistryMonitorState({
  dataDir,
}: {
  dataDir?: string
} = {}) {
  const value = await readStoredJson(STATE_PATH, dataDir)
  return value === null ? null : registryMonitorStateSchema.parse(value)
}

export async function loadRegistryHealthSnapshot({
  dataDir,
  abortSignal,
}: {
  dataDir?: string
  abortSignal?: AbortSignal
} = {}) {
  if (abortSignal?.aborted) {
    throw abortSignal.reason ?? new Error("Registry health read was aborted.")
  }

  const value = await readStoredJson(LATEST_PATH, dataDir)
  return value === null ? null : registryHealthSnapshotSchema.parse(value)
}

function getRunPath(run: RegistryMonitorRun) {
  const timestamp = run.startedAt.replaceAll(":", "-").replaceAll(".", "-")
  return `${STORAGE_PREFIX}/runs/${timestamp}.json`
}

function getDailyPath(snapshot: RegistryHealthSnapshot) {
  return `${STORAGE_PREFIX}/daily/${snapshot.generatedAt.slice(0, 10)}.json`
}

function getDailyDocument(
  state: RegistryMonitorState,
  snapshot: RegistryHealthSnapshot
) {
  const date = snapshot.generatedAt.slice(0, 10)
  return {
    schemaVersion: snapshot.schemaVersion,
    scoreVersion: snapshot.scoreVersion,
    date,
    generatedAt: snapshot.generatedAt,
    globalMeans: snapshot.globalMeans,
    registries: Object.fromEntries(
      Object.entries(state.registries).map(([name, entry]) => [
        name,
        {
          aggregate: entry.daily.find((bucket) => bucket.date === date) ?? null,
          health: snapshot.registries[name],
        },
      ])
    ),
  }
}

export async function publishRegistryHealth({
  state,
  snapshot,
  run,
  dataDir,
}: {
  state: RegistryMonitorState
  snapshot: RegistryHealthSnapshot
  run: RegistryMonitorRun
  dataDir?: string
}) {
  await writeStoredJson(getRunPath(run), run, dataDir)
  await writeStoredJson(
    getDailyPath(snapshot),
    getDailyDocument(state, snapshot),
    dataDir,
    true
  )
  await writeStoredJson(STATE_PATH, state, dataDir, true)
  await writeStoredJson(LATEST_PATH, snapshot, dataDir, true)

  return { latestPath: LATEST_PATH }
}

export async function cleanRegistryHealthHistory({
  dataDir,
  now = new Date(),
}: {
  dataDir?: string
  now?: Date
} = {}) {
  const policies = [
    { prefix: `${STORAGE_PREFIX}/runs`, retentionDays: 14 },
    { prefix: `${STORAGE_PREFIX}/daily`, retentionDays: 90 },
  ]
  const stale: string[] = []

  for (const policy of policies) {
    const files = await listStoredFiles(policy.prefix, dataDir)
    const cutoff = now.getTime() - policy.retentionDays * 24 * 60 * 60 * 1000
    stale.push(
      ...files
        .filter((file) => file.modifiedAt.getTime() < cutoff)
        .map((file) => file.pathname)
    )
  }

  for (const pathname of stale) {
    await fs.rm(resolveStoragePath(dataDir, pathname), { force: true })
  }

  return { deleted: stale.length }
}

export { LATEST_PATH, STATE_PATH, STORAGE_PREFIX }
