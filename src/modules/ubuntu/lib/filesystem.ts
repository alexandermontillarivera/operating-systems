import type { UFile } from "@/modules/ubuntu/types"

export const homeFs = (): UFile => ({
  name: "Home",
  type: "folder",
  children: [
    {
      name: "Desktop",
      type: "folder",
      children: [
        { name: "welcome.txt", type: "file", ext: "txt", size: 256, content: "Welcome to Ubuntu!" },
      ],
    },
    {
      name: "Documents",
      type: "folder",
      children: [
        { name: "report.odt", type: "file", ext: "odt", size: 4096 },
        {
          name: "linux_history.txt",
          type: "file",
          ext: "txt",
          content: "See History app for details",
          size: 1024,
        },
      ],
    },
    {
      name: "Downloads",
      type: "folder",
      children: [{ name: "ubuntu-24.04.iso", type: "file", ext: "iso", size: 4_900_000_000 }],
    },
    { name: "Music", type: "folder", children: [] },
    { name: "Pictures", type: "folder", children: [] },
    { name: "Videos", type: "folder", children: [] },
    {
      name: ".bashrc",
      type: "file",
      ext: "bashrc",
      size: 3771,
      content: "# .bashrc\nexport PS1='\\u@\\h:\\w\\$ '\nalias ll='ls -la'\nalias la='ls -A'",
    },
  ],
})

export function navigate(root: UFile, parts: string[]): UFile | null {
  if (parts.length === 0 || parts[0] !== root.name) return null
  let cur: UFile = root
  for (let i = 1; i < parts.length; i++) {
    if (cur.type !== "folder" || !cur.children) return null
    const c = cur.children.find((x) => x.name === parts[i])
    if (!c) return null
    cur = c
  }
  return cur
}
