import Link from "next/link"
import { PlusSignIcon as HugePlusSignIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { getColors } from "@/lib/colors"
import { siteConfig } from "@/lib/config"
import { source } from "@/lib/source"
import { CommandMenu } from "@/components/command-menu"
import { DesignerActions } from "@/components/designer-actions"
import { GitHubLink } from "@/components/github-link"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeSwitcher } from "@/components/mode-switcher"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { Button } from "@/styles/radix-nova/ui/button"

export function SiteHeader() {
  const colors = getColors()
  const pageTree = source.pageTree

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container-wrapper px-6 group-has-data-[slot=designer]/layout:max-w-none 3xl:fixed:px-0">
        <div className="flex h-(--header-height) items-center **:data-[slot=separator]:h-4! group-has-data-[slot=designer]/layout:fixed:max-w-none 3xl:fixed:container">
          <MobileNav
            tree={pageTree}
            items={siteConfig.navItems}
            className="flex lg:hidden"
          />
          <Link
            href="/"
            aria-label="Moonwitness UI home"
            className="mr-5 inline-flex shrink-0 items-center gap-2 rounded-md font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--mw-ink)] text-[var(--mw-accent)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 64 64"
                className="size-6"
              >
                <circle cx="28" cy="32" r="19" fill="currentColor" />
                <circle cx="38" cy="25" r="18" fill="var(--mw-ink)" />
                <path
                  d="M49 42l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="hidden sm:inline">
              Moonwitness <span className="text-muted-foreground">UI</span>
            </span>
          </Link>
          <MainNav items={siteConfig.navItems} className="hidden lg:flex" />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu
                tree={pageTree}
                colors={colors}
                navItems={siteConfig.navItems}
              />
            </div>
            <Separator
              orientation="vertical"
              className="ml-2 hidden lg:block"
            />
            <GitHubLink />
            <Separator orientation="vertical" />
            <ModeSwitcher />
            <DesignerActions />
            <div className="flex items-center gap-2 group-has-data-[slot=designer]/layout:hidden">
              <Separator orientation="vertical" />
              <Button asChild size="sm" className="h-[31px] rounded-lg">
                <Link href="/create">
                  <HugeiconsIcon icon={HugePlusSignIcon} />
                  New
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
