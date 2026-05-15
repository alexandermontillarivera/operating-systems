export type PaneType = "terminal" | "neofetch" | "config" | "wiki" | "history"

export interface Pane {
  id: number
  type: PaneType
  title: string
  workspace: number
}

export type SplitMode = "h" | "v"
