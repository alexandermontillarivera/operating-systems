"use client"

import { useState } from "react"
import { homeFs, navigate } from "@/modules/ubuntu/lib/filesystem"
import type { UFile } from "@/modules/ubuntu/types"

const SIDEBAR = ["Home", "Desktop", "Documents", "Downloads", "Music", "Pictures", "Videos", "Trash"]

export function Files() {
  const [root] = useState<UFile>(homeFs())
  const [path, setPath] = useState<string[]>(["Home"])
  const cur = navigate(root, path)

  return (
    <div className="h-full flex text-black">
      <div className="w-44 bg-[#2d2d2d] text-gray-200 p-2 text-sm">
        <div className="text-xs text-gray-500 mb-1 px-2">Places</div>
        {SIDEBAR.map((s) => (
          <button
            key={s}
            onClick={() => setPath(s === "Home" ? ["Home"] : ["Home", s])}
            className={`w-full text-left px-2 py-1 rounded hover:bg-[#404040] flex items-center gap-2 ${path[path.length - 1] === s || (s === "Home" && path.length === 1) ? "bg-[#E95420]" : ""}`}
          >
            <span>📁</span> {s}
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col bg-white">
        <div className="bg-[#2d2d2d] text-white px-3 py-1 flex items-center gap-2 text-xs">
          <button
            onClick={() => path.length > 1 && setPath(path.slice(0, -1))}
            className="px-2 py-0.5 rounded hover:bg-white/10"
          >
            ◀
          </button>
          <button className="px-2 py-0.5 rounded hover:bg-white/10">▶</button>
          <span className="bg-black/30 px-2 py-0.5 rounded flex-1">{path.join(" › ")}</span>
        </div>
        <div className="flex-1 p-3 overflow-auto">
          {cur?.type === "folder" && cur.children && cur.children.length > 0 ? (
            <div className="grid grid-cols-5 gap-3">
              {cur.children.map((c) => (
                <button
                  key={c.name}
                  onDoubleClick={() => {
                    if (c.type === "folder") setPath([...path, c.name])
                  }}
                  className="flex flex-col items-center p-2 hover:bg-blue-100 rounded"
                >
                  <span className="text-4xl mb-1">
                    {c.type === "folder"
                      ? "📁"
                      : c.ext === "txt"
                        ? "📄"
                        : c.ext === "iso"
                          ? "💿"
                          : "📄"}
                  </span>
                  <span className="text-xs text-center break-words">{c.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic">Empty folder</div>
          )}
        </div>
        <div className="bg-gray-100 border-t border-gray-200 px-3 py-1 text-[10px] text-gray-700">
          {cur?.children?.length ?? 0} item{cur?.children?.length === 1 ? "" : "s"}, free space: 28.4 GB
        </div>
      </div>
    </div>
  )
}
