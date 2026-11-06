import { MoonwitnessMark } from "@/components/moonwitness-mark"
import { siteConfig } from "@/lib/config"

export function SiteFooter() {
  return (
    <footer className="group-has-[.docs-nav]/body:pb-20 group-has-[.section-soft]/body:bg-surface/40 group-has-[[data-slot=designer]]/body:hidden group-has-[[data-slot=docs]]/body:hidden group-has-[.docs-nav]/body:sm:pb-0 dark:bg-transparent dark:group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent">
      <div className="container-wrapper px-4 xl:px-6">
        <div className="flex min-h-(--footer-height) flex-col items-center justify-center gap-2 py-5 text-center sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
            <span className="mw-brand-symbol size-7">
              <MoonwitnessMark size={21} />
            </span>
            <span>
              <span className="font-semibold text-foreground">Moonwitness UI</span>
              <span className="mx-1.5">·</span>
              Observe. Understand. Preserve.
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 text-xs text-muted-foreground sm:text-sm">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Source on GitHub
            </a>
            <span aria-hidden="true">·</span>
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
