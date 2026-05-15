export type Drive = "A" | "B"

export interface EdState {
  active: boolean
  drive: Drive
  filename: string
  buffer: string[]
  mode: "command" | "insert"
  insertAt: number
  currentLine: number
  dirty: boolean
}

export interface WSState {
  active: boolean
  drive: Drive
  filename: string
  text: string
  showHelp: boolean
}

export interface BasicState {
  active: boolean
  program: Map<number, string>
}
