export type AppId =
  | "filemanager"
  | "control"
  | "msdos"
  | "notepad"
  | "write"
  | "paintbrush"
  | "calculator"
  | "clock"
  | "solitaire"
  | "minesweeper"
  | "history"
  | "about"
  | "main-group"
  | "acc-group"
  | "games-group"
  | "startup-group"

export interface Win31WindowState {
  id: string
  title: string
  app: AppId
  x: number
  y: number
  width: number
  height: number
  minimized: boolean
  zIndex: number
}

export interface FmFile {
  name: string
  type: "folder" | "file"
  size?: number
  children?: FmFile[]
}
