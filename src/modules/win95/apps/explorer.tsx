"use client"

import { useState } from "react"
import { ExeFileIcon, FileIcon, FolderIcon, TextFileIcon } from "@/modules/win95/components/icons"
import { makeWin95Fs, navigate } from "@/modules/win95/lib/filesystem"
import type { Win95File } from "@/modules/win95/types"

interface ExplorerProps {
  initialPath?: string[]
  onOpenFile: (file: Win95File) => void
}

export function Explorer({ initialPath, onOpenFile }: ExplorerProps) {
  const [root] = useState<Win95File>(makeWin95Fs())
  const [path, setPath] = useState<string[]>(initialPath ?? ["C:"])
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["C:"]))

  const cur = navigate(root, path)

  const toggle = (key: string) => {
    setExpanded((s) => {
      const ns = new Set(s)
      if (ns.has(key)) ns.delete(key)
      else ns.add(key)
      return ns
    })
  }

  const renderTree = (node: Win95File, key: string, depth: number): React.ReactNode => {
    if (node.type !== "folder") return null
    const isOpen = expanded.has(key)
    const isCurrent = path.join("/") === key
    return (
      <div key={key}>
        <div
          onClick={() => {
            const parts = key.split("/")
            setPath(parts)
            toggle(key)
          }}
          className={`flex items-center gap-1 cursor-pointer text-[11px] py-px ${
            isCurrent ? "bg-[#000080] text-white" : "hover:bg-[#dfdfdf]"
          }`}
          style={{ paddingLeft: depth * 12 + 4 }}
        >
          <span className="w-3 text-center text-[10px]">
            {node.children?.some((c) => c.type === "folder") ? (isOpen ? "−" : "+") : ""}
          </span>
          <FolderIcon size={16} open={isOpen} />
          <span>{node.name}</span>
        </div>
        {isOpen &&
          node.children?.filter((c) => c.type === "folder").map((c) => renderTree(c, `${key}/${c.name}`, depth + 1))}
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]" style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}>
      <div className="px-1 py-0.5 flex gap-2 text-[11px] border-b border-[#808080]">
        {["Archivo", "Edición", "Ver", "Herramientas", "Ayuda"].map((m) => (
          <button key={m} className="px-1 hover:bg-[#000080] hover:text-white">
            <u>{m[0]}</u>
            {m.slice(1)}
          </button>
        ))}
      </div>
      <div className="px-2 py-1 flex items-center gap-2 text-[11px] border-b border-[#808080] bg-[#c0c0c0]">
        <button
          onClick={() => setPath((p) => (p.length > 1 ? p.slice(0, -1) : p))}
          className="px-2 py-0.5 bg-[#c0c0c0]"
          style={{
            boxShadow: "inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf",
          }}
        >
          ◀ Atrás
        </button>
        <span
          className="px-2 py-0.5 bg-white flex-1 truncate"
          style={{ boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff" }}
        >
          {path.join("\\") + "\\"}
        </span>
      </div>
      <div className="flex-1 flex">
        <div
          className="w-44 m-0.5 mr-0 bg-white overflow-auto"
          style={{ boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff, inset 2px 2px 0 0 #404040, inset -2px -2px 0 0 #dfdfdf" }}
        >
          {renderTree(root, root.name, 0)}
        </div>
        <div
          className="flex-1 m-0.5 ml-0 bg-white overflow-auto"
          style={{ boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff, inset 2px 2px 0 0 #404040, inset -2px -2px 0 0 #dfdfdf" }}
        >
          {cur?.type === "folder" && cur.children ? (
            <div className="grid grid-cols-3 gap-1 p-2">
              {cur.children.map((c) => (
                <button
                  key={c.name}
                  onDoubleClick={() => {
                    if (c.type === "folder") {
                      setPath([...path, c.name])
                      setExpanded((s) => new Set(s).add([...path, c.name].join("/")))
                    } else {
                      onOpenFile(c)
                    }
                  }}
                  className="flex flex-col items-center p-1 hover:bg-[#000080] hover:text-white text-[11px] group"
                >
                  <div className="mb-0.5">
                    {c.type === "folder" ? (
                      <FolderIcon size={32} />
                    ) : c.ext === "exe" ? (
                      <ExeFileIcon size={32} />
                    ) : c.ext === "txt" || c.ext === "bat" ? (
                      <TextFileIcon size={32} />
                    ) : (
                      <FileIcon size={32} />
                    )}
                  </div>
                  <span className="text-center break-words leading-tight px-1">{c.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-3 text-sm text-gray-600">Carpeta vacía</div>
          )}
        </div>
      </div>
      <div
        className="bg-[#c0c0c0] px-2 py-0.5 text-[11px] flex justify-between"
        style={{ boxShadow: "inset 0 1px 0 0 #fff" }}
      >
        <div
          className="px-2"
          style={{ boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff" }}
        >
          {cur?.children?.length ?? 0} objeto(s)
        </div>
        <div
          className="px-2"
          style={{ boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff" }}
        >
          1.23 MB libres
        </div>
      </div>
    </div>
  )
}
