export type FsNode =
  | { type: "dir"; children: Record<string, FsNode> }
  | { type: "file"; content: string }

export interface EdState {
  active: boolean
  file: string
  buffer: string[]
  mode: "command" | "insert"
  insertAfter: number
  currentLine: number
  dirty: boolean
}
