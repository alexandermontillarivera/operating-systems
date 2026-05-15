"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import type { AppId } from "@/modules/winxp/types"
import { useClock } from "@/modules/winxp/hooks/use-clock"
import { useWindowManager } from "@/modules/winxp/hooks/use-window-manager"
import { BlissWallpaper } from "@/modules/winxp/components/bliss-wallpaper"
import { DesktopIcon } from "@/modules/winxp/components/desktop-icon"
import { StartMenu, type LaunchKey } from "@/modules/winxp/components/start-menu"
import { Taskbar } from "@/modules/winxp/components/taskbar"
import { WelcomeScreen } from "@/modules/winxp/components/welcome-screen"
import { WinXPWindow } from "@/modules/winxp/components/window"
import {
  appIcon,
  BookIcon,
  FolderIcon,
  IEIcon,
  MyComputerIcon,
  TrashIcon,
} from "@/modules/winxp/components/icons"
import { AppRenderer } from "@/modules/winxp/apps/app-renderer"

interface WinXPSimulatorProps {
  onBack: () => void
}

const APP_DEFAULTS: Record<AppId, { title: string; width: number; height: number }> = {
  mycomputer: { title: "Mi PC", width: 600, height: 420 },
  mydocs: { title: "Mis documentos", width: 580, height: 400 },
  ie: { title: "Microsoft Internet Explorer", width: 720, height: 480 },
  mediaplayer: { title: "Windows Media Player", width: 540, height: 380 },
  paint: { title: "Paint", width: 600, height: 460 },
  notepad: { title: "Bloc de notas", width: 460, height: 320 },
  calc: { title: "Calculadora", width: 240, height: 320 },
  minesweeper: { title: "Buscaminas", width: 360, height: 420 },
  solitaire: { title: "Solitario", width: 640, height: 460 },
  history: { title: "Historia de Windows XP", width: 580, height: 460 },
  outlook: { title: "Outlook Express", width: 600, height: 420 },
  messenger: { title: "Windows Messenger", width: 360, height: 480 },
  moviemaker: { title: "Movie Maker", width: 600, height: 420 },
  controlpanel: { title: "Panel de control", width: 540, height: 400 },
}

export function WinXPSimulator({ onBack }: WinXPSimulatorProps) {
  const wm = useWindowManager()
  const time = useClock()
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    if (!showWelcome) return
    const t = setTimeout(() => setShowWelcome(false), 1500)
    return () => clearTimeout(t)
  }, [showWelcome])

  const launch = useCallback(
    (id: string, title: string, app: AppId, data?: unknown, opts?: { width?: number; height?: number }) => {
      const def = APP_DEFAULTS[app]
      wm.openApp(id, title, app, data, {
        width: opts?.width ?? def.width,
        height: opts?.height ?? def.height,
      })
      setStartMenuOpen(false)
    },
    [wm],
  )

  const handleLaunch = (key: LaunchKey) => {
    const map: Record<LaunchKey, AppId> = {
      ie: "ie",
      outlook: "outlook",
      mediaplayer: "mediaplayer",
      messenger: "messenger",
      moviemaker: "moviemaker",
      paint: "paint",
      notepad: "notepad",
      calc: "calc",
      minesweeper: "minesweeper",
      solitaire: "solitaire",
      mydocs: "mydocs",
      mypc: "mycomputer",
      controlpanel: "controlpanel",
    }
    launch(key, APP_DEFAULTS[map[key]].title, map[key])
  }

  if (showWelcome) return <WelcomeScreen />

  const desktopItems = [
    { id: "mycomputer", label: "Mi PC", icon: <MyComputerIcon />, onOpen: () => launch("mypc", "Mi PC", "mycomputer") },
    {
      id: "mydocs",
      label: "Mis documentos",
      icon: <FolderIcon />,
      onOpen: () => launch("mydocs", "Mis documentos", "mydocs"),
    },
    {
      id: "recycle",
      label: "Papelera",
      icon: <TrashIcon />,
      onOpen: () => launch("recycle", "Papelera de reciclaje", "mydocs", { folder: "Papelera" }),
    },
    {
      id: "ie",
      label: "Internet Explorer",
      icon: <IEIcon size={36} />,
      onOpen: () => launch("ie", "Internet Explorer", "ie"),
    },
    {
      id: "history",
      label: "Historia de XP",
      icon: <BookIcon />,
      onOpen: () => launch("history", "Historia de Windows XP", "history"),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col select-none overflow-hidden relative text-black"
    >
      <BlissWallpaper />

      <div className="flex-1 relative p-2 z-10">
        <div className="flex flex-col gap-2 absolute left-2 top-2">
          {desktopItems.map((it) => (
            <DesktopIcon key={it.id} label={it.label} icon={it.icon} onOpen={it.onOpen} />
          ))}
        </div>

        <AnimatePresence>
          {wm.windows
            .filter((w) => !w.minimized)
            .map((w) => (
              <WinXPWindow
                key={w.id}
                state={w}
                isActive={wm.activeId === w.id}
                icon={appIcon(w.app)}
                onClose={() => wm.closeWindow(w.id)}
                onMinimize={() => wm.minimizeWindow(w.id)}
                onMaximize={() => wm.maximizeWindow(w.id)}
                onFocus={() => wm.focusWindow(w.id)}
              >
                <AppRenderer app={w.app} data={w.data} openApp={launch} />
              </WinXPWindow>
            ))}
        </AnimatePresence>
      </div>

      <Taskbar
        windows={wm.windows}
        activeId={wm.activeId}
        startMenuOpen={startMenuOpen}
        time={time}
        onStartClick={() => setStartMenuOpen((s) => !s)}
        onTaskItem={(id) => {
          const w = wm.windows.find((x) => x.id === id)
          if (w?.minimized) wm.focusWindow(id)
          else if (wm.activeId === id) wm.minimizeWindow(id)
          else wm.focusWindow(id)
        }}
        appIconFor={appIcon}
      />

      <StartMenu
        open={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onShutdown={onBack}
        onLaunch={handleLaunch}
      />

      <button
        onClick={onBack}
        className="absolute top-2 right-2 px-4 py-1 bg-white/90 hover:bg-white rounded text-sm shadow z-[1001]"
      >
        Volver
      </button>
    </motion.div>
  )
}
