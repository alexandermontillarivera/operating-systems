"use client"

import { useState } from "react"
import { MenuBar } from "@/modules/win31/components/menu-bar"
import { initialFm } from "@/modules/win31/lib/filesystem"
import type { FmFile } from "@/modules/win31/types"

/** WinFile-style File Manager: tree on the left, file list on the right. */
export function FileManager() {
  const [root] = useState<FmFile>(initialFm())
  const [selected, setSelected] = useState<FmFile>(root)
  const [expanded, setExpanded] = useState<Set<string>>(new Set([root.name]))

  const togglePath = (path: string) => {
    setExpanded((s) => {
      const ns = new Set(s)
      if (ns.has(path)) ns.delete(path)
      else ns.add(path)
      return ns
    })
  }

  const renderTree = (node: FmFile, path: string, depth: number): React.ReactNode => {
    if (node.type !== "folder") return null
    const fullPath = `${path}/${node.name}`
    const isOpen = expanded.has(fullPath)
    return (
      <div key={fullPath}>
        <div
          onClick={() => {
            setSelected(node)
            togglePath(fullPath)
          }}
          className={`flex items-center gap-1 cursor-pointer px-1 ${
            selected === node ? "bg-[#000080] text-white" : "text-black"
          }`}
          style={{ paddingLeft: depth * 12 + 4 }}
        >
          <span className="w-3 text-center text-xs">{isOpen ? "−" : "+"}</span>
          <span>{isOpen ? "📂" : "📁"}</span>
          <span className="text-xs">{node.name}</span>
        </div>
        {isOpen && node.children?.map((c) => renderTree(c, fullPath, depth + 1))}
      </div>
    )
  }

  return (
    <div
      className="h-full flex flex-col text-black"
      style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
    >
      <MenuBar items={["File", "Disk", "Tree", "View", "Options", "Window"]} />
      <div className="flex-1 flex bg-white">
        <div className="w-1/2 border-r-2 border-[#808080] overflow-auto p-1 text-sm">
          {renderTree(root, "", 0)}
        </div>
        <div className="flex-1 overflow-auto p-1 text-xs">
          <div className="font-bold border-b border-gray-400 pb-1 mb-1">
            {selected.name} — {selected.children?.length ?? 0} items
          </div>
          {selected.children?.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-2 hover:bg-[#000080] hover:text-white px-1 py-0.5 cursor-pointer"
            >
              <span>{c.type === "folder" ? "📁" : "📄"}</span>
              <span className="flex-1">{c.name}</span>
              <span className="text-[10px] opacity-70">
                {c.type === "folder" ? "<DIR>" : `${c.size?.toLocaleString() ?? 0}b`}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#c0c0c0] border-t border-[#404040] px-2 py-0.5 text-[10px]">
        C: 1,234,567 bytes free, 41,943,040 bytes total
      </div>
    </div>
  )
}
