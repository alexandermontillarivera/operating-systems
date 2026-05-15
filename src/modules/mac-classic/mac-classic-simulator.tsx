"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import type { AppId, MacFile } from "@/modules/mac-classic/types"
import { initialFs } from "@/modules/mac-classic/lib/filesystem"
import { useClock } from "@/modules/mac-classic/hooks/use-clock"
import { useWindowManager } from "@/modules/mac-classic/hooks/use-window-manager"
import { BackButton } from "@/modules/mac-classic/components/back-button"
import { DesktopIcon } from "@/modules/mac-classic/components/desktop-icon"
import { DropdownMenu } from "@/modules/mac-classic/components/dropdown-menu"
import { HardDiskIcon, TrashIcon } from "@/modules/mac-classic/components/icons"
import { MenuBar } from "@/modules/mac-classic/components/menu-bar"
import { StartupScreen } from "@/modules/mac-classic/components/startup-screen"
import { Window } from "@/modules/mac-classic/components/window"
import { AppRenderer } from "@/modules/mac-classic/apps/app-renderer"

interface MacClassicSimulatorProps {
  onBack: () => void
}

const APP_DEFAULTS: Record<AppId, { title: string; width: number; height: number }> = {
  finder: { title: "Macintosh HD", width: 480, height: 340 },
  simpletext: { title: "SimpleText", width: 480, height: 340 },
  macpaint: { title: "MacPaint", width: 540, height: 420 },
  calculator: { title: "Calculator", width: 220, height: 280 },
  notepad: { title: "Note Pad", width: 320, height: 280 },
  history: { title: "History of Macintosh", width: 480, height: 360 },
  trash: { title: "Trash", width: 380, height: 260 },
  about: { title: "About This Macintosh", width: 380, height: 260 },
}

export function MacClassicSimulator({ onBack }: MacClassicSimulatorProps) {
  const wm = useWindowManager()
  const time = useClock()
  const [fs] = useState<MacFile[]>(() => initialFs())
  const [trash, setTrash] = useState<MacFile[]>([])
  const [appleMenuOpen, setAppleMenuOpen] = useState(false)
  const [fileMenuOpen, setFileMenuOpen] = useState(false)
  const [showStartup, setShowStartup] = useState(true)

  useEffect(() => {
    if (!showStartup) return
    const t = setTimeout(() => setShowStartup(false), 1800)
    return () => clearTimeout(t)
  }, [showStartup])

  const launch = useCallback(
    (id: string, title: string, app: AppId, data?: unknown, opts?: { width?: number; height?: number }) => {
      const def = APP_DEFAULTS[app]
      wm.openApp(id, title, app, data, {
        width: opts?.width ?? def.width,
        height: opts?.height ?? def.height,
      })
      setAppleMenuOpen(false)
      setFileMenuOpen(false)
    },
    [wm],
  )

  const openFile = useCallback(
    (file: MacFile) => {
      const id = `file-${file.name}`
      if (file.type === "folder") launch(id, file.name, "finder", { folder: file })
      else if (file.type === "doc") launch(id, file.name, "simpletext", { file })
      else launch(id, file.name, "macpaint", { file }, { width: 540, height: 420 })
    },
    [launch],
  )

  const trashFile = (file: MacFile, parent: MacFile[]) => {
    const idx = parent.findIndex((f) => f === file)
    if (idx >= 0) {
      parent.splice(idx, 1)
      setTrash((t) => [...t, file])
    }
  }

  if (showStartup) return <StartupScreen />

  const activeApp = wm.windows.find((w) => w.id === wm.activeId)?.app

  const appleItems = [
    {
      label: "About This Macintosh...",
      onClick: () => launch("about", "About This Macintosh", "about"),
    },
    { divider: true },
    { label: "Calculator", onClick: () => launch("calc", "Calculator", "calculator") },
    { label: "Note Pad", onClick: () => launch("notepad", "Note Pad", "notepad") },
    { label: "MacPaint", onClick: () => launch("paint-da", "MacPaint", "macpaint") },
    { label: "History", onClick: () => launch("history", "History of Macintosh", "history") },
    { divider: true },
    { label: "Shut Down...", onClick: onBack },
  ]

  const fileItems = [
    {
      label: "Open Macintosh HD...",
      onClick: () =>
        launch("hd", "Macintosh HD", "finder", {
          folder: { name: "Macintosh HD", type: "folder", children: fs },
        }),
    },
    { divider: true },
    {
      label: "Close Window",
      onClick: () => wm.activeId && wm.closeWindow(wm.activeId),
    },
    { divider: true },
    { label: "Quit", onClick: onBack },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col select-none relative text-black"
      style={{
        background: "white",
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)",
        backgroundSize: "4px 4px",
      }}
    >
      <MenuBar
        appleOpen={appleMenuOpen}
        fileOpen={fileMenuOpen}
        onToggleApple={() => {
          setAppleMenuOpen((o) => !o)
          setFileMenuOpen(false)
        }}
        onToggleFile={() => {
          setFileMenuOpen((o) => !o)
          setAppleMenuOpen(false)
        }}
        activeApp={activeApp}
        time={time}
      />

      <DropdownMenu
        open={appleMenuOpen}
        items={appleItems}
        left={4}
        width={210}
        onClose={() => setAppleMenuOpen(false)}
      />
      <DropdownMenu
        open={fileMenuOpen}
        items={fileItems}
        left={48}
        width={180}
        onClose={() => setFileMenuOpen(false)}
      />

      {/* Desktop */}
      <div className="flex-1 relative p-4">
        {/* Right-side desktop icons (real Mac convention) */}
        <div className="flex flex-col gap-4 absolute right-4 top-4">
          <DesktopIcon
            label="Macintosh HD"
            onOpen={() =>
              launch("hd", "Macintosh HD", "finder", {
                folder: { name: "Macintosh HD", type: "folder", children: fs },
              })
            }
            icon={<HardDiskIcon size={36} />}
          />
          <DesktopIcon
            label="Trash"
            onOpen={() => launch("trash", "Trash", "trash")}
            icon={<TrashIcon size={36} full={trash.length > 0} />}
          />
        </div>

        <AnimatePresence>
          {wm.windows.map((win) => (
            <Window
              key={win.id}
              state={win}
              isActive={wm.activeId === win.id}
              onClose={() => wm.closeWindow(win.id)}
              onFocus={() => wm.focusWindow(win.id)}
            >
              <AppRenderer
                app={win.app}
                data={win.data}
                trash={trash}
                onOpenFile={openFile}
                onTrashFile={trashFile}
                openApp={(id, title, app, data) => launch(id, title, app, data)}
              />
            </Window>
          ))}
        </AnimatePresence>
      </div>

      <BackButton onClick={onBack} />
    </motion.div>
  )
}
