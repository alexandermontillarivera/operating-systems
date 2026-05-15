export type AppId =
  | "finder"
  | "simpletext"
  | "macpaint"
  | "calculator"
  | "notepad"
  | "history"
  | "trash"
  | "about"

export interface MacWindowState {
  id: string
  title: string
  app: AppId
  data?: unknown
  x: number
  y: number
  width: number
  height: number
  zIndex: number
}

export interface MacFile {
  name: string
  type: "folder" | "doc" | "paint"
  content?: string
  children?: MacFile[]
}
