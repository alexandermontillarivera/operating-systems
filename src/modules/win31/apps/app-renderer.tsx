"use client"

import type { AppId } from "@/modules/win31/types"
import { AboutDialog } from "@/modules/win31/apps/about"
import { Calculator } from "@/modules/win31/apps/calculator"
import { Clock } from "@/modules/win31/apps/clock"
import { ControlPanel } from "@/modules/win31/apps/control-panel"
import { DosBox } from "@/modules/win31/apps/dos-box"
import { FileManager } from "@/modules/win31/apps/file-manager"
import {
  AccessoriesGroup,
  GamesGroup,
  StartupGroup,
} from "@/modules/win31/apps/groups"
import { HistoryView } from "@/modules/win31/apps/history"
import { Minesweeper } from "@/modules/win31/apps/minesweeper"
import { Notepad } from "@/modules/win31/apps/notepad"
import { Paintbrush } from "@/modules/win31/apps/paintbrush"
import { ProgramManager } from "@/modules/win31/apps/program-manager"
import { Solitaire } from "@/modules/win31/apps/solitaire"
import { Write } from "@/modules/win31/apps/write"

interface AppRendererProps {
  app: AppId
  openApp: (id: string, title: string, app: AppId, opts?: { width?: number; height?: number }) => void
}

export function AppRenderer({ app, openApp }: AppRendererProps) {
  switch (app) {
    case "main-group":
      return <ProgramManager openApp={openApp} />
    case "acc-group":
      return <AccessoriesGroup openApp={openApp} />
    case "games-group":
      return <GamesGroup openApp={openApp} />
    case "startup-group":
      return <StartupGroup />
    case "filemanager":
      return <FileManager />
    case "notepad":
      return <Notepad />
    case "write":
      return <Write />
    case "calculator":
      return <Calculator />
    case "paintbrush":
      return <Paintbrush />
    case "clock":
      return <Clock />
    case "solitaire":
      return <Solitaire />
    case "minesweeper":
      return <Minesweeper />
    case "control":
      return <ControlPanel />
    case "msdos":
      return <DosBox />
    case "history":
      return <HistoryView />
    case "about":
      return <AboutDialog />
  }
}
