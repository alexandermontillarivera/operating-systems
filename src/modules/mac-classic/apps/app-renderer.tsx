"use client"

import type { AppId, MacFile } from "@/modules/mac-classic/types"
import { AboutApp } from "@/modules/mac-classic/apps/about"
import { Calculator } from "@/modules/mac-classic/apps/calculator"
import { Finder } from "@/modules/mac-classic/apps/finder"
import { HistoryApp } from "@/modules/mac-classic/apps/history"
import { MacPaint } from "@/modules/mac-classic/apps/mac-paint"
import { NotePad } from "@/modules/mac-classic/apps/note-pad"
import { SimpleText } from "@/modules/mac-classic/apps/simple-text"
import { TrashApp } from "@/modules/mac-classic/apps/trash"

interface AppRendererProps {
  app: AppId
  data: unknown
  trash: MacFile[]
  onOpenFile: (file: MacFile) => void
  onTrashFile: (file: MacFile, parent: MacFile[]) => void
  openApp: (id: string, title: string, app: AppId, data?: unknown) => void
}

export function AppRenderer({
  app,
  data,
  trash,
  onOpenFile,
  onTrashFile,
  openApp,
}: AppRendererProps) {
  switch (app) {
    case "finder":
      return <Finder data={data} onOpenFile={onOpenFile} onTrashFile={onTrashFile} />
    case "simpletext":
      return <SimpleText data={data} />
    case "macpaint":
      return <MacPaint />
    case "calculator":
      return <Calculator />
    case "notepad":
      return <NotePad />
    case "history":
      return <HistoryApp />
    case "trash":
      return <TrashApp trash={trash} openApp={openApp} />
    case "about":
      return <AboutApp />
  }
}
