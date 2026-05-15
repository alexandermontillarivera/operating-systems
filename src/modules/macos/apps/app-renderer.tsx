"use client"

import type { AppId } from "@/modules/macos/types"
import { Calculator } from "@/modules/macos/apps/calculator"
import { Calendar } from "@/modules/macos/apps/calendar"
import { Finder } from "@/modules/macos/apps/finder"
import { HistoryView } from "@/modules/macos/apps/history"
import { Mail } from "@/modules/macos/apps/mail"
import { Music } from "@/modules/macos/apps/music"
import { Notes } from "@/modules/macos/apps/notes"
import { Photos } from "@/modules/macos/apps/photos"
import { Safari } from "@/modules/macos/apps/safari"
import { Settings } from "@/modules/macos/apps/settings"
import { Terminal } from "@/modules/macos/apps/terminal"

interface AppRendererProps {
  app: AppId
  time: Date
}

export function AppRenderer({ app, time }: AppRendererProps) {
  switch (app) {
    case "finder":
      return <Finder />
    case "safari":
      return <Safari />
    case "notes":
      return <Notes time={time} />
    case "photos":
      return <Photos />
    case "music":
      return <Music />
    case "terminal":
      return <Terminal />
    case "history":
      return <HistoryView />
    case "settings":
      return <Settings />
    case "calculator":
      return <Calculator />
    case "calendar":
      return <Calendar time={time} />
    case "mail":
      return <Mail />
  }
}
