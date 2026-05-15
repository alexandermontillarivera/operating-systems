export type AppId =
  | "finder"
  | "safari"
  | "notes"
  | "photos"
  | "music"
  | "terminal"
  | "history"
  | "settings"
  | "calculator"
  | "calendar"
  | "mail"

export interface MacOSWindowState {
  id: string
  title: string
  app: AppId
  data?: unknown
  x: number
  y: number
  width: number
  height: number
  minimized: boolean
  zIndex: number
}
