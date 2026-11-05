"use client"

import * as React from "react"

import { MoonwitnessMark } from "@/components/moonwitness-mark"
import { Button } from "@/styles/base-nova/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/styles/base-nova/ui/dialog"

const STORAGE_KEY = "moonwitness-ui-project-builder-welcome"

export function WelcomeDialog() {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      setIsOpen(true)
    }
  }, [])

  const handleOpenChange = React.useCallback((open: boolean) => {
    setIsOpen(open)
    if (!open) {
      localStorage.setItem(STORAGE_KEY, "true")
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="dialog-ring max-w-92 min-w-0 gap-0 overflow-hidden rounded-xl p-0 sm:max-w-sm dark:bg-neutral-900"
      >
        <div className="flex aspect-[2/1.2] w-full items-center justify-center rounded-t-xl bg-neutral-950 text-center text-neutral-100 sm:aspect-2/1">
          <MoonwitnessMark size={56} />
        </div>
        <DialogHeader className="gap-1 p-4">
          <DialogTitle className="text-left text-base">
            Create your Moonwitness UI project
          </DialogTitle>
          <DialogDescription className="text-left leading-relaxed text-foreground">
            Shape your project from the ground up. Choose a component base, font, color scheme, icons, and more.
          </DialogDescription>
          <DialogDescription className="mt-2 text-left leading-relaxed font-medium text-foreground">
            Available for major React frameworks.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="m-0">
          <DialogClose render={<Button className="w-full" />}>
            Get Started
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
