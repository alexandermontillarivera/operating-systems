"use client"

import { Win7Sidebar } from "@/modules/win7/components/sidebar"

interface DocumentsProps {
  folder?: string
}

export function Documents({ folder = "Mis documentos" }: DocumentsProps) {
  return (
    <div className="h-full flex bg-white text-black">
      <Win7Sidebar
        items={[
          { icon: "📁", label: "Documentos" },
          { icon: "🖼️", label: "Imágenes" },
          { icon: "🎵", label: "Música" },
          { icon: "🎬", label: "Videos" },
        ]}
      />
      <div className="flex-1 p-4">
        <h3 className="text-sm font-semibold mb-3">{folder}</h3>
        {folder === "Papelera" ? (
          <div className="text-sm text-gray-500 italic">La papelera está vacía.</div>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: "📄", name: "Bienvenida.txt" },
              { icon: "📄", name: "Presupuesto.xlsx" },
              { icon: "🖼️", name: "Foto.jpg" },
              { icon: "📁", name: "Proyecto" },
              { icon: "📁", name: "Backup" },
            ].map((f, i) => (
              <button key={i} className="flex flex-col items-center p-2 hover:bg-blue-100 rounded">
                <span className="text-3xl mb-1">{f.icon}</span>
                <span className="text-xs text-center">{f.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
