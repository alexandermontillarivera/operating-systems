export type AppId =
  | "mycomputer"
  | "explorer"
  | "notepad"
  | "wordpad"
  | "paint"
  | "calculator"
  | "minesweeper"
  | "solitaire"
  | "history"
  | "recycle"
  | "run"
  | "find"

export interface Win95WindowState {
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

export interface Win95File {
  name: string
  type: "folder" | "file"
  ext?: string
  size?: number
  content?: string
  children?: Win95File[]
}
