"use client"

import type { AppId } from "@/modules/win7/types"
import { Calc } from "@/modules/win7/apps/calc"
import { Computer } from "@/modules/win7/apps/computer"
import { ControlPanel } from "@/modules/win7/apps/control-panel"
import { Documents } from "@/modules/win7/apps/documents"
import { HistoryView } from "@/modules/win7/apps/history"
import { IE9 } from "@/modules/win7/apps/ie9"
import { WMPlayer } from "@/modules/win7/apps/media-player"
import { Notepad } from "@/modules/win7/apps/notepad"
import { Paint } from "@/modules/win7/apps/paint"

interface AppRendererProps {
  app: AppId
  data?: unknown
}

export function AppRenderer({ app, data }: AppRendererProps) {
  switch (app) {
    case "computer":
      return <Computer />
    case "documents":
      return <Documents folder={(data as { folder?: string } | undefined)?.folder ?? "Mis documentos"} />
    case "ie":
      return <IE9 />
    case "notepad":
      return <Notepad />
    case "calc":
      return <Calc />
    case "paint":
      return <Paint />
    case "history":
      return <HistoryView />
    case "controlpanel":
      return <ControlPanel />
    case "wmplayer":
      return <WMPlayer />
  }
}
