export interface TerminalLine {
  type: "input" | "output" | "system"
  content: string
}

export type FsNode =
  | { type: "dir"; children: Record<string, FsNode> }
  | { type: "file"; content: string }

export interface ViState {
  active: boolean
  file: string
  buffer: string[]
  mode: "normal" | "insert" | "command"
  row: number
  col: number
  cmdInput: string
  message: string
  dirty: boolean
}
