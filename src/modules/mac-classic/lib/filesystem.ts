import type { MacFile } from "@/modules/mac-classic/types"

export const initialFs = (): MacFile[] => [
  {
    name: "System Folder",
    type: "folder",
    children: [
      { name: "System", type: "doc", content: "// Mac OS System file - do not edit" },
      { name: "Finder", type: "doc", content: "// The Finder application" },
    ],
  },
  {
    name: "Applications",
    type: "folder",
    children: [
      { name: "MacPaint", type: "paint", content: "" },
      {
        name: "MacWrite",
        type: "doc",
        content: "MacWrite document\n\nA word processor for the Macintosh.",
      },
      { name: "Calculator", type: "doc", content: "Calculator desk accessory." },
    ],
  },
  {
    name: "Documents",
    type: "folder",
    children: [
      {
        name: "Read Me.txt",
        type: "doc",
        content:
          "Welcome to your Macintosh!\n\nDouble-click any document to open it.\nDrag windows by their title bar.\nUse the Apple menu for desk accessories.",
      },
      {
        name: "Letter.txt",
        type: "doc",
        content:
          "Dear Steve,\n\nThe new Macintosh is amazing.\nThe mouse really does change everything.\n\nBest,\nA fan from 1984",
      },
      { name: "Drawing.paint", type: "paint", content: "" },
    ],
  },
]
