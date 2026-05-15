"use client"

import type { AppId } from "@/modules/ubuntu/types"
import { Calc } from "@/modules/ubuntu/apps/calc"
import { Files } from "@/modules/ubuntu/apps/files"
import { Firefox } from "@/modules/ubuntu/apps/firefox"
import { Gedit } from "@/modules/ubuntu/apps/gedit"
import { HistoryView } from "@/modules/ubuntu/apps/history"
import { Settings } from "@/modules/ubuntu/apps/settings"
import { Software } from "@/modules/ubuntu/apps/software"
import { Terminal } from "@/modules/ubuntu/apps/terminal"

interface AppRendererProps {
  app: AppId
}

export function AppRenderer({ app }: AppRendererProps) {
  switch (app) {
    case "files":
      return <Files />
    case "terminal":
      return <Terminal />
    case "firefox":
      return <Firefox />
    case "settings":
      return <Settings />
    case "software":
      return <Software />
    case "gedit":
      return <Gedit />
    case "calculator":
      return <Calc />
    case "history":
      return <HistoryView />
  }
}
