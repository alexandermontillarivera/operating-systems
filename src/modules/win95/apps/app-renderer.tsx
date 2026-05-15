"use client"

import type { AppId, Win95File } from "@/modules/win95/types"
import { Calculator } from "@/modules/win95/apps/calculator"
import { Explorer } from "@/modules/win95/apps/explorer"
import { Find } from "@/modules/win95/apps/find"
import { HistoryApp } from "@/modules/win95/apps/history-app"
import { Minesweeper } from "@/modules/win95/apps/minesweeper"
import { MyComputer } from "@/modules/win95/apps/my-computer"
import { Notepad } from "@/modules/win95/apps/notepad"
import { Paint } from "@/modules/win95/apps/paint"
import { RecycleBin } from "@/modules/win95/apps/recycle-bin"
import { Run } from "@/modules/win95/apps/run"
import { Solitaire } from "@/modules/win95/apps/solitaire"
import { WordPad } from "@/modules/win95/apps/wordpad"

interface AppRendererProps {
  app: AppId
  data?: unknown
  windowId: string
  onOpenFile: (file: Win95File) => void
  onOpenC: () => void
  onRun: (cmd: string) => void
  onCloseWindow: (id: string) => void
}

export function AppRenderer({ app, data, windowId, onOpenFile, onOpenC, onRun, onCloseWindow }: AppRendererProps) {
  switch (app) {
    case "mycomputer":
      return <MyComputer onOpenC={onOpenC} />
    case "explorer":
      return (
        <Explorer
          initialPath={(data as { path?: string[] } | undefined)?.path}
          onOpenFile={onOpenFile}
        />
      )
    case "notepad":
      return <Notepad initial={(data as { content?: string } | undefined)?.content} />
    case "wordpad":
      return <WordPad initial={(data as { content?: string } | undefined)?.content} />
    case "paint":
      return <Paint />
    case "calculator":
      return <Calculator />
    case "minesweeper":
      return <Minesweeper />
    case "solitaire":
      return <Solitaire />
    case "history":
      return <HistoryApp />
    case "recycle":
      return <RecycleBin />
    case "run":
      return <Run onRun={onRun} onCancel={() => onCloseWindow(windowId)} />
    case "find":
      return <Find />
  }
}
