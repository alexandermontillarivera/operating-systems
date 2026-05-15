export type AppId =
  | "computer"
  | "documents"
  | "ie"
  | "notepad"
  | "calc"
  | "paint"
  | "history"
  | "controlpanel"
  | "wmplayer"

export type SnapMode = "none" | "left" | "right" | "max"

export interface Win7WindowState {
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
  snap: SnapMode
  zIndex: number
}
