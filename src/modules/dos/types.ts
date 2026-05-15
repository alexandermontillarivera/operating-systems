export type Drive = "C" | "A"

export interface FileEntry {
  type: "file"
  content: string
  size: number
}

export interface DirEntry {
  type: "dir"
  children: Record<string, FsEntry>
}

export type FsEntry = FileEntry | DirEntry

export interface EditState {
  active: boolean
  drive: Drive
  path: string[]
  filename: string
  text: string
}

export interface SnakeState {
  active: boolean
  body: { x: number; y: number }[]
  dir: { x: number; y: number }
  food: { x: number; y: number }
  score: number
  dead: boolean
}

export const SNAKE_W = 30
export const SNAKE_H = 18
