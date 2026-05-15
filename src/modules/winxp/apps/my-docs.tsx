"use client"

import { XPSidebar } from "@/modules/winxp/components/xp-sidebar"

interface MyDocsProps {
  folderName: string
}

const FILES: Record<string, { icon: string; name: string }[]> = {
  "Mis documentos": [
    { icon: "📁", name: "Mi música" },
    { icon: "📁", name: "Mis imágenes" },
    { icon: "📁", name: "Mis videos" },
    { icon: "📄", name: "Bienvenida.txt" },
    { icon: "📄", name: "Tareas.doc" },
    { icon: "🖼️", name: "Bliss.jpg" },
  ],
  Compartidos: [
    { icon: "📁", name: "Música" },
    { icon: "📁", name: "Imágenes" },
    { icon: "📄", name: "ReadMe.txt" },
  ],
  Papelera: [],
}

export function MyDocs({ folderName }: MyDocsProps) {
  const items = FILES[folderName] || []
  return (
    <div className="h-full flex text-black">
      <XPSidebar>
        <div className="bg-white/10 backdrop-blur rounded-md p-2">
          <h3 className="font-bold mb-1">Tareas de archivo</h3>
          <p className="hover:underline cursor-pointer">Crear nueva carpeta</p>
          <p className="hover:underline cursor-pointer">Publicar en Web</p>
          <p className="hover:underline cursor-pointer">Compartir esta carpeta</p>
        </div>
      </XPSidebar>
      <div className="flex-1 p-4 bg-white">
        <h3 className="text-sm font-bold mb-2">{folderName}</h3>
        {items.length === 0 ? (
          <div className="text-sm text-gray-500 italic">Esta carpeta está vacía.</div>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {items.map((f, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-2 hover:bg-blue-100 rounded cursor-pointer"
              >
                <span className="text-3xl mb-1">{f.icon}</span>
                <span className="text-xs text-center">{f.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
