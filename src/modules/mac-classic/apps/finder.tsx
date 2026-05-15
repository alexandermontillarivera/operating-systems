"use client"

import {
  DocumentIcon,
  FolderIcon,
  PaintDocIcon,
} from "@/modules/mac-classic/components/icons"
import type { MacFile } from "@/modules/mac-classic/types"

interface FinderProps {
  data: unknown
  onOpenFile: (file: MacFile) => void
  onTrashFile: (file: MacFile, parent: MacFile[]) => void
}

/** Mac Finder folder view. Double-click opens; right-click sends to trash. */
export function Finder({ data, onOpenFile, onTrashFile }: FinderProps) {
  const folder = (data as { folder: MacFile } | undefined)?.folder
  if (!folder || folder.type !== "folder" || !folder.children) {
    return (
      <div
        className="p-4 text-sm text-gray-500"
        style={{ fontFamily: "'ChicagoFLF', 'Geneva', sans-serif" }}
      >
        Folder is empty
      </div>
    )
  }
  return (
    <div
      className="h-full bg-white p-2 overflow-auto"
      style={{ fontFamily: "'ChicagoFLF', 'Geneva', sans-serif" }}
    >
      <div className="text-[11px] text-gray-700 mb-2 px-2">
        {folder.children.length} item{folder.children.length === 1 ? "" : "s"}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {folder.children.map((f) => (
          <button
            key={f.name}
            onDoubleClick={() => onOpenFile(f)}
            onContextMenu={(e) => {
              e.preventDefault()
              if (folder.children) onTrashFile(f, folder.children)
            }}
            className="flex flex-col items-center p-1 hover:bg-black hover:text-white text-[11px]"
          >
            <FileGlyph type={f.type} />
            <span className="mt-1 text-center break-words leading-tight px-1">{f.name}</span>
          </button>
        ))}
      </div>
      <div
        className="mt-3 text-[10px] text-gray-500 px-2"
        style={{ fontFamily: "'ChicagoFLF', 'Geneva', sans-serif" }}
      >
        Doble-click para abrir · Click derecho para enviar a la papelera
      </div>
    </div>
  )
}

function FileGlyph({ type }: { type: MacFile["type"] }) {
  if (type === "folder") return <FolderIcon size={32} />
  if (type === "paint") return <PaintDocIcon size={32} />
  return <DocumentIcon size={32} />
}
