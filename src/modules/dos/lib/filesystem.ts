import type { DirEntry, Drive, FsEntry } from "@/modules/dos/types"

export const initialFs = (): Record<Drive, DirEntry> => ({
  C: {
    type: "dir",
    children: {
      DOS: {
        type: "dir",
        children: {
          "EDIT.COM": { type: "file", content: "/* MS-DOS Editor */", size: 413 },
          "FORMAT.COM": { type: "file", content: "/* Format utility */", size: 22974 },
          "HIMEM.SYS": { type: "file", content: "/* High Memory Manager */", size: 13824 },
          "MOUSE.COM": { type: "file", content: "/* Mouse driver */", size: 22944 },
          "DOSKEY.COM": { type: "file", content: "/* DOSKEY */", size: 5883 },
        },
      },
      WINDOWS: {
        type: "dir",
        children: {
          "WIN.COM": { type: "file", content: "/* Windows loader */", size: 25719 },
          "SYSTEM.INI": {
            type: "file",
            content: "[386Enh]\nmouse=*vmd\n[boot]\nshell=progman.exe",
            size: 2048,
          },
        },
      },
      GAMES: {
        type: "dir",
        children: {
          "SNAKE.EXE": { type: "file", content: "/* Snake game */", size: 4096 },
          "DOOM.EXE": { type: "file", content: "/* Doom (1993) */", size: 715752 },
          "PRINCE.EXE": { type: "file", content: "/* Prince of Persia */", size: 122880 },
        },
      },
      DOCS: {
        type: "dir",
        children: {
          "README.TXT": {
            type: "file",
            content:
              "Welcome to MS-DOS 6.22\n\nThis is the last standalone version of MS-DOS.\nType HELP for available commands.\nType EDIT to launch the full-screen editor.\nType SNAKE to play.\n",
            size: 256,
          },
        },
      },
      "AUTOEXEC.BAT": {
        type: "file",
        content:
          "@ECHO OFF\nPATH C:\\DOS;C:\\WINDOWS\nSET TEMP=C:\\TEMP\nPROMPT $P$G\nLH MOUSE.COM\nLH DOSKEY",
        size: 128,
      },
      "CONFIG.SYS": {
        type: "file",
        content:
          "DEVICE=C:\\DOS\\HIMEM.SYS\nDEVICE=C:\\DOS\\EMM386.EXE NOEMS\nDOS=HIGH,UMB\nFILES=40\nBUFFERS=20",
        size: 256,
      },
      "COMMAND.COM": { type: "file", content: "/* Command interpreter */", size: 54619 },
    },
  },
  A: { type: "dir", children: {} },
})

export function navigate(root: DirEntry, parts: string[]): FsEntry | null {
  let cur: FsEntry = root
  for (const p of parts) {
    if (cur.type !== "dir") return null
    const target = p.toUpperCase()
    const children: Record<string, FsEntry> = cur.children
    const names: string[] = Object.keys(children)
    const key: string | undefined = names.find((name: string) => name.toUpperCase() === target)
    if (!key) return null
    cur = children[key]
  }
  return cur
}
