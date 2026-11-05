import { siteConfig } from "@/lib/config"

export function SiteFooter() {
  return (
    <footer className="group-has-[.docs-nav]/body:pb-20 group-has-[.section-soft]/body:bg-surface/40 group-has-[[data-slot=designer]]/body:hidden group-has-[[data-slot=docs]]/body:hidden group-has-[.docs-nav]/body:sm:pb-0 dark:bg-transparent dark:group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent">
      <div className="container-wrapper px-4 xl:px-6">
        <div className="flex min-h-(--footer-height) items-center justify-center py-4">
          <div className="w-full px-1 text-center text-xs leading-loose text-muted-foreground sm:text-sm">
            <span className="font-medium text-foreground">
              Moonwitness UI
            </span>{" "}
            — Observe. Understand. Preserve.{" "}
            <span className="mx-1">·</span>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Source on GitHub
            </a>
            <span className="mx-1">·</span>
            <a
              href={siteConfig.links.upstream}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Built on shadcn/ui
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
