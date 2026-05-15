export type AppId =
  | "mycomputer"
  | "mydocs"
  | "ie"
  | "mediaplayer"
  | "paint"
  | "notepad"
  | "calc"
  | "minesweeper"
  | "solitaire"
  | "history"
  | "outlook"
  | "messenger"
  | "moviemaker"
  | "controlpanel"

export interface WinXPWindowState {
  id: string
  title: string
  app: AppId
  data?: unknown
  x: number
  y: number
  width: number
  height: number
  minimized: boolean
  maximized: boolean
  zIndex: number
}
