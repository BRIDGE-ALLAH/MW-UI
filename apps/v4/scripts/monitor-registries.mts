import { spawn } from "node:child_process"
import { promises as fs } from "node:fs"
import path from "node:path"

import { registryDirectorySchema } from "../lib/registry-directory"
import {
  cleanRegistryHealthHistory,
  loadRegistryMonitorState,
  publishRegistryHealth,
} from "../lib/registry-health/blob"
import { runLocalCliDryRun } from "../lib/registry-health/dry-run"
import {
  runRegistryMonitor,
  type RegistryMonitorMode,
} from "../lib/registry-health/monitor"
import {
  registryMonitorOutputSchema,
  registryMonitorStateSchema,
} from "../lib/registry-health/schema"
import directory from "../registry/directory.json"

const PHASES = new Set(["prepare", "check", "publish"] as const)
const MODES = new Set<RegistryMonitorMode>([
  "auto",
  "hourly",
  "daily",
  "weekly",
  "all",
])
const DATA_DIRECTORY = path.resolve(
  process.env.MOONWITNESS_DATA_DIR ?? path.join(process.cwd(), ".moonwitness-data")
)
const WORK_DIRECTORY = path.join(DATA_DIRECTORY, "monitor-work")
const PREVIOUS_STATE_PATH = path.join(WORK_DIRECTORY, "previous-state.json")
const MONITOR_OUTPUT_PATH = path.join(WORK_DIRECTORY, "monitor-output.json")

type MonitorPhase = "prepare" | "check" | "publish"

function getArgument(name: string) {
  const index = process.argv.indexOf(name)
  if (index >= 0) {
    const value = process.argv[index + 1]
    if (!value || value.startsWith("--")) {
      throw new Error("Missing value for " + name)
    }
    return value
  }

  const argument = process.argv.find((value) => value.startsWith(name + "="))
  if (!argument) return undefined

  const value = argument.slice(name.length + 1)
  if (!value) {
    throw new Error("Missing value for " + name)
  }
  return value
}

function getPhase() {
  const value = getArgument("--phase")
  if (!value) return null

  if (!PHASES.has(value as MonitorPhase)) {
    throw new Error("Invalid monitor phase: " + value)
  }

  return value as MonitorPhase
}

function getMode() {
  const value = getArgument("--mode") ?? process.env.MONITOR_MODE
  const mode = (value ?? "auto") as RegistryMonitorMode

  if (!MODES.has(mode)) {
    throw new Error("Invalid monitor mode: " + value)
  }

  return mode
}

async function readJson(pathname: string) {
  return JSON.parse(await fs.readFile(pathname, "utf8")) as unknown
}

async function writeJson(pathname: string, value: unknown) {
  await fs.mkdir(path.dirname(pathname), { recursive: true })
  const temporaryPath = pathname + "." + process.pid + ".tmp"
  await fs.writeFile(temporaryPath, JSON.stringify(value))
  await fs.rename(temporaryPath, pathname)
}

async function writeStepSummary({
  latestPath,
  mode,
  totals,
  diagnostics,
  deleted,
}: {
  latestPath: string
  mode: RegistryMonitorMode
  totals: {
    registries: number
    reachable: number
    unavailable: number
    challenges: number
    itemChecks: number
    dryRuns: number
  }
  diagnostics: string[]
  deleted: number
}) {
  if (!process.env.GITHUB_STEP_SUMMARY) return

  const rows = [
    "## Registry health monitor",
    "",
    "- Mode: " + mode,
    "- Registries: " + totals.registries,
    "- Reachable indexes: " + totals.reachable,
    "- Unavailable indexes: " + totals.unavailable,
    "- Bot challenges: " + totals.challenges,
    "- Item checks: " + totals.itemChecks,
    "- Dry runs: " + totals.dryRuns,
    "- Expired history deleted: " + deleted,
    "- Latest snapshot: " + latestPath,
  ]

  if (diagnostics.length > 0) {
    rows.push("", "### Diagnostics", "")
    rows.push(...diagnostics.map((diagnostic) => "- " + diagnostic))
  }

  await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, rows.join("\n") + "\n")
}

async function prepareMonitor() {
  const previousState = await loadRegistryMonitorState({
    dataDir: DATA_DIRECTORY,
  })

  await fs.mkdir(WORK_DIRECTORY, { recursive: true })
  await fs.rm(MONITOR_OUTPUT_PATH, { force: true })
  await writeJson(PREVIOUS_STATE_PATH, previousState)
  console.log(
    previousState
      ? "Registry health state loaded from local storage."
      : "No previous registry health state found."
  )
}

async function checkRegistries() {
  const previousStateValue = await readJson(PREVIOUS_STATE_PATH)
  const previousState =
    previousStateValue === null
      ? null
      : registryMonitorStateSchema.parse(previousStateValue)
  const parsedDirectory = registryDirectorySchema.parse(directory)
  const cliPath = path.resolve(
    process.cwd(),
    "../../packages/shadcn/dist/index.js"
  )
  const result = await runRegistryMonitor({
    directory: parsedDirectory,
    previousState,
    mode: getMode(),
    runDryRun: (options) => runLocalCliDryRun({ ...options, cliPath }),
  })

  await writeJson(MONITOR_OUTPUT_PATH, result)
  console.log(
    "Registry checks completed for " +
      result.run.totals.registries +
      " registries."
  )
}

async function publishMonitor() {
  const result = registryMonitorOutputSchema.parse(
    await readJson(MONITOR_OUTPUT_PATH)
  )
  const publication = await publishRegistryHealth({
    ...result,
    dataDir: DATA_DIRECTORY,
  })
  const cleanup = await cleanRegistryHealthHistory({
    dataDir: DATA_DIRECTORY,
  })

  await writeStepSummary({
    latestPath: publication.latestPath,
    mode: result.run.mode,
    totals: result.run.totals,
    diagnostics: result.run.diagnostics,
    deleted: cleanup.deleted,
  })
  await fs.rm(WORK_DIRECTORY, { recursive: true, force: true })
  console.log("Registry health snapshot saved: " + publication.latestPath)
}

async function runPackageScript(
  script: string,
  environment: NodeJS.ProcessEnv
) {
  const isWindows = process.platform === "win32"
  const command = isWindows ? "pnpm.cmd" : "pnpm"

  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, ["run", script], {
      cwd: process.cwd(),
      env: environment,
      shell: isWindows,
      stdio: "inherit",
    })

    child.on("error", reject)
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(
        new Error(
          script +
            " failed with " +
            (signal ? "signal " + signal : "exit code " + code)
        )
      )
    })
  })
}

async function runAllPhases() {
  await runPackageScript("registry:health:prepare", process.env)
  await runPackageScript("registry:health:check", process.env)
  await runPackageScript("registry:health:publish", process.env)
}

async function main() {
  const phase = getPhase()

  if (!phase) {
    await runAllPhases()
    return
  }

  if (phase === "prepare") {
    await prepareMonitor()
    return
  }

  if (phase === "check") {
    await checkRegistries()
    return
  }

  await publishMonitor()
}

main().catch((error) => {
  console.error(
    "Registry health monitor failed:",
    error instanceof Error ? error.message : "Unknown error"
  )
  process.exitCode = 1
})
