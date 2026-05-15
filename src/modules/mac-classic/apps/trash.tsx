"use client"

import {
  DocumentIcon,
  FolderIcon,
  PaintDocIcon,
} from "@/modules/mac-classic/components/icons"
import type { AppId, MacFile } from "@/modules/mac-classic/types"

interface TrashAppProps {
  trash: MacFile[]
  openApp: (id: string, title: string, app: AppId, data?: unknown) => void
}

export function TrashApp({ trash, openApp }: TrashAppProps) {
  return (
    <div
      className="h-full bg-white p-3 overflow-auto text-black"
      style={{ fontFamily: "'ChicagoFLF', 'Geneva', sans-serif" }}
    >
      <div className="text-xs text-gray-700 mb-2">{trash.length} item(s) in Trash</div>
      <div className="grid grid-cols-4 gap-3">
        {trash.map((f, i) => (
          <button
            key={i}
            onDoubleClick={() => {
              if (f.type === "folder") openApp(`trash-${i}`, f.name, "finder", { folder: f })
              else if (f.type === "doc") openApp(`trash-${i}`, f.name, "simpletext", { file: f })
              else openApp(`trash-${i}`, f.name, "macpaint", { file: f })
            }}
            className="flex flex-col items-center p-2 hover:bg-black hover:text-white text-[11px]"
          >
            {f.type === "folder" ? (
              <FolderIcon size={32} />
            ) : f.type === "paint" ? (
              <PaintDocIcon size={32} />
            ) : (
              <DocumentIcon size={32} />
            )}
            <span className="mt-1 text-center">{f.name}</span>
          </button>
        ))}
      </div>
      {trash.length === 0 && (
        <div className="text-center text-gray-500 mt-10 text-sm">The Trash is empty.</div>
      )}
    </div>
  )
}
