export type AppId =
  | "files"
  | "terminal"
  | "firefox"
  | "settings"
  | "software"
  | "gedit"
  | "calculator"
  | "history"

export interface UbuntuWindowState {
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

export interface UFile {
  name: string
  type: "folder" | "file"
  ext?: string
  size?: number
  content?: string
  children?: UFile[]
}
