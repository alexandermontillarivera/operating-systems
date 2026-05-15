"use client"

import { useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { AppId, Win95File } from "@/modules/win95/types"
import { useClock } from "@/modules/win95/hooks/use-clock"
import { useWindowManager } from "@/modules/win95/hooks/use-window-manager"
import { ContextMenu } from "@/modules/win95/components/context-menu"
import { DesktopIcon } from "@/modules/win95/components/desktop-icon"
import { ShutdownScreen } from "@/modules/win95/components/shutdown-screen"
import { StartMenu, type LaunchKey } from "@/modules/win95/components/start-menu"
import { Taskbar } from "@/modules/win95/components/taskbar"
import { Window } from "@/modules/win95/components/window"
import {
  CalcIcon,
  ExeFileIcon,
  FolderIcon,
  HelpIcon,
  MinesIcon,
  MyComputerIcon,
  NotepadIcon,
  PaintIcon,
  RecycleBinIcon,
  RunIcon,
  SettingsIcon,
  SolitaireIcon,
} from "@/modules/win95/components/icons"
import { AppRenderer } from "@/modules/win95/apps/app-renderer"

interface Win95SimulatorProps {
  onBack: () => void
}

const APP_DEFAULTS: Record<AppId, { title: string; width: number; height: number }> = {
  mycomputer: { title: "Mi PC", width: 480, height: 340 },
  explorer: { title: "Explorando", width: 620, height: 420 },
  notepad: { title: "Sin título - Bloc de notas", width: 460, height: 320 },
  wordpad: { title: "Documento - WordPad", width: 540, height: 380 },
  paint: { title: "Sin título - Paint", width: 600, height: 460 },
  calculator: { title: "Calculadora", width: 256, height: 280 },
  minesweeper: { title: "Buscaminas", width: 280, height: 320 },
  solitaire: { title: "Solitario", width: 660, height: 460 },
  history: { title: "Historia de Windows 95", width: 520, height: 420 },
  recycle: { title: "Papelera de reciclaje", width: 380, height: 260 },
  run: { title: "Ejecutar", width: 360, height: 180 },
  find: { title: "Buscar archivos", width: 420, height: 240 },
}

function appIconFor(app: AppId): React.ReactNode {
  switch (app) {
    case "mycomputer":
      return <MyComputerIcon size={16} />
    case "explorer":
      return <FolderIcon size={16} open />
    case "notepad":
      return <NotepadIcon size={16} />
    case "wordpad":
      return <NotepadIcon size={16} />
    case "paint":
      return <PaintIcon size={16} />
    case "calculator":
      return <CalcIcon size={16} />
    case "minesweeper":
      return <MinesIcon size={16} />
    case "solitaire":
      return <SolitaireIcon size={16} />
    case "history":
      return <HelpIcon size={16} />
    case "recycle":
      return <RecycleBinIcon size={16} />
    case "run":
      return <RunIcon size={16} />
    case "find":
      return <SettingsIcon size={16} />
  }
}

export function Win95Simulator({ onBack }: Win95SimulatorProps) {
  const wm = useWindowManager()
  const time = useClock()
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [shutdown, setShutdown] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)

  const launchApp = useCallback(
    (app: AppId, opts?: { id?: string; title?: string; data?: unknown }) => {
      const def = APP_DEFAULTS[app]
      wm.openApp(opts?.id ?? app, opts?.title ?? def.title, app, opts?.data, {
        width: def.width,
        height: def.height,
      })
    },
    [wm],
  )

  const handleStartLaunch = (key: LaunchKey) => {
    switch (key) {
      case "notepad":
        launchApp("notepad")
        break
      case "wordpad":
        launchApp("wordpad")
        break
      case "paint":
        launchApp("paint")
        break
      case "calculator":
        launchApp("calculator")
        break
      case "minesweeper":
        launchApp("minesweeper")
        break
      case "solitaire":
        launchApp("solitaire")
        break
      case "explorer":
        launchApp("explorer", { id: "explorer", data: { path: ["C:"] } })
        break
      case "documents":
        launchApp("explorer", { id: "explorer-docs", title: "Mis Documentos", data: { path: ["C:", "Mis Documentos"] } })
        break
      case "find":
        launchApp("find")
        break
      case "run":
        launchApp("run")
        break
      case "settings":
        launchApp("explorer", { id: "control-panel", title: "Panel de control", data: { path: ["C:", "Windows"] } })
        break
      case "help":
        launchApp("history", { id: "help" })
        break
    }
  }

  const handleRun = (cmd: string) => {
    const t = cmd.trim().toLowerCase()
    const map: Record<string, AppId> = {
      notepad: "notepad",
      "notepad.exe": "notepad",
      calc: "calculator",
      "calc.exe": "calculator",
      mspaint: "paint",
      "mspaint.exe": "paint",
      paint: "paint",
      pbrush: "paint",
      wordpad: "wordpad",
      write: "wordpad",
      winmine: "minesweeper",
      mines: "minesweeper",
      sol: "solitaire",
      explorer: "explorer",
    }
    const target = map[t]
    if (target) {
      launchApp(target)
      wm.closeWindow("run")
    } else {
      alert("Windows no puede encontrar el archivo " + cmd)
    }
  }

  const openFile = (file: Win95File) => {
    if (file.ext === "txt" || file.ext === "bat" || file.ext === "sys") {
      launchApp("notepad", { id: `notepad-${file.name}`, title: file.name + " - Bloc de notas", data: { content: file.content } })
    } else if (file.ext === "rtf" || file.ext === "doc") {
      launchApp("wordpad", { id: `wordpad-${file.name}`, title: file.name + " - WordPad", data: { content: file.content } })
    } else if (file.ext === "exe") {
      const map: Record<string, AppId> = {
        "notepad.exe": "notepad",
        "calc.exe": "calculator",
        "winmine.exe": "minesweeper",
        "sol.exe": "solitaire",
        "mspaint.exe": "paint",
        "wordpad.exe": "wordpad",
        "explorer.exe": "explorer",
      }
      const target = map[file.name]
      if (target) launchApp(target)
    }
  }

  if (shutdown) return <ShutdownScreen onBack={onBack} />

  const desktopItems: { id: string; label: string; icon: React.ReactNode; onOpen: () => void }[] = [
    {
      id: "mycomputer",
      label: "Mi PC",
      icon: <MyComputerIcon size={32} />,
      onOpen: () => launchApp("mycomputer"),
    },
    {
      id: "recycle",
      label: "Papelera",
      icon: <RecycleBinIcon size={32} />,
      onOpen: () => launchApp("recycle"),
    },
    {
      id: "explorer",
      label: "Mis Documentos",
      icon: <FolderIcon size={32} />,
      onOpen: () =>
        launchApp("explorer", {
          id: "explorer-mydocs",
          title: "Mis Documentos",
          data: { path: ["C:", "Mis Documentos"] },
        }),
    },
    {
      id: "notepad-launch",
      label: "Bloc de notas",
      icon: <NotepadIcon size={32} />,
      onOpen: () => launchApp("notepad"),
    },
    {
      id: "minesweeper-launch",
      label: "Buscaminas",
      icon: <MinesIcon size={32} />,
      onOpen: () => launchApp("minesweeper"),
    },
    {
      id: "solitaire-launch",
      label: "Solitario",
      icon: <SolitaireIcon size={32} />,
      onOpen: () => launchApp("solitaire"),
    },
    {
      id: "history-launch",
      label: "Historia Win 95",
      icon: <ExeFileIcon size={32} />,
      onOpen: () => launchApp("history"),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col select-none text-black"
      style={{
        background: "#008080",
        fontFamily: "Tahoma, 'MS Sans Serif', sans-serif",
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        setContextMenu({ x: e.clientX, y: e.clientY })
      }}
      onClick={() => {
        setStartMenuOpen(false)
        setContextMenu(null)
      }}
    >
      {/* Desktop */}
      <div className="flex-1 relative overflow-hidden">
        <div className="grid grid-flow-col grid-rows-7 gap-x-2 gap-y-1 absolute left-2 top-2 content-start">
          {desktopItems.map((it) => (
            <DesktopIcon key={it.id} label={it.label} icon={it.icon} onOpen={it.onOpen} />
          ))}
        </div>

        <AnimatePresence>
          {wm.windows
            .filter((w) => !w.minimized)
            .map((w) => (
              <Window
                key={w.id}
                state={w}
                isActive={wm.activeId === w.id}
                icon={appIconFor(w.app)}
                onClose={() => wm.closeWindow(w.id)}
                onMinimize={() => wm.minimizeWindow(w.id)}
                onFocus={() => wm.focusWindow(w.id)}
              >
                <AppRenderer
                  app={w.app}
                  data={w.data}
                  windowId={w.id}
                  onOpenFile={openFile}
                  onOpenC={() => launchApp("explorer", { id: "explorer-c", title: "C:\\", data: { path: ["C:"] } })}
                  onRun={handleRun}
                  onCloseWindow={wm.closeWindow}
                />
              </Window>
            ))}
        </AnimatePresence>

        {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={() => setContextMenu(null)} />}
      </div>

      <Taskbar
        windows={wm.windows}
        activeId={wm.activeId}
        startMenuOpen={startMenuOpen}
        time={time}
        onStartClick={() => setStartMenuOpen((s) => !s)}
        onTaskbarItemClick={wm.toggleMinimize}
        taskbarIconFor={appIconFor}
      />

      <StartMenu
        open={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onShutdown={() => setShutdown(true)}
        onLaunch={handleStartLaunch}
      />

      <button
        onClick={onBack}
        className="absolute top-2 right-2 px-3 py-0.5 bg-[#c0c0c0] text-[11px] z-[1001]"
        style={{
          boxShadow:
            "inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf",
        }}
      >
        Volver
      </button>
    </motion.div>
  )
}
