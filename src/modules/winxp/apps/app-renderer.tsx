"use client"

import type { AppId } from "@/modules/winxp/types"
import { Calc } from "@/modules/winxp/apps/calc"
import { ControlPanel } from "@/modules/winxp/apps/control-panel"
import { HistoryView } from "@/modules/winxp/apps/history"
import { InternetExplorer } from "@/modules/winxp/apps/internet-explorer"
import { MediaPlayer } from "@/modules/winxp/apps/media-player"
import { Messenger } from "@/modules/winxp/apps/messenger"
import { Minesweeper } from "@/modules/winxp/apps/minesweeper"
import { MovieMaker } from "@/modules/winxp/apps/movie-maker"
import { MyComputer } from "@/modules/winxp/apps/my-computer"
import { MyDocs } from "@/modules/winxp/apps/my-docs"
import { Notepad } from "@/modules/winxp/apps/notepad"
import { Outlook } from "@/modules/winxp/apps/outlook"
import { Paint } from "@/modules/winxp/apps/paint"
import { Solitaire } from "@/modules/winxp/apps/solitaire"

interface AppRendererProps {
  app: AppId
  data?: unknown
  openApp: (id: string, title: string, app: AppId, data?: unknown, opts?: { width?: number; height?: number }) => void
}

export function AppRenderer({ app, data, openApp }: AppRendererProps) {
  switch (app) {
    case "mycomputer":
      return <MyComputer openApp={openApp} />
    case "mydocs":
      return <MyDocs folderName={(data as { folder?: string } | undefined)?.folder ?? "Mis documentos"} />
    case "ie":
      return <InternetExplorer />
    case "mediaplayer":
      return <MediaPlayer />
    case "paint":
      return <Paint />
    case "notepad":
      return <Notepad />
    case "calc":
      return <Calc />
    case "minesweeper":
      return <Minesweeper />
    case "solitaire":
      return <Solitaire />
    case "history":
      return <HistoryView />
    case "outlook":
      return <Outlook />
    case "messenger":
      return <Messenger />
    case "moviemaker":
      return <MovieMaker />
    case "controlpanel":
      return <ControlPanel />
  }
}
