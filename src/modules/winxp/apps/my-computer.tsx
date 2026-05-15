"use client"

import { XPSidebar } from "@/modules/winxp/components/xp-sidebar"
import type { AppId } from "@/modules/winxp/types"

interface MyComputerProps {
  openApp: (id: string, title: string, app: AppId, data?: unknown, opts?: { width?: number; height?: number }) => void
}

export function MyComputer({ openApp }: MyComputerProps) {
  return (
    <div className="h-full flex text-black">
      <XPSidebar>
        <div className="bg-white/10 backdrop-blur rounded-md p-2 mb-2">
          <h3 className="font-bold mb-1">Tareas del sistema</h3>
          <p className="hover:underline cursor-pointer">Ver información del sistema</p>
          <p className="hover:underline cursor-pointer">Agregar/quitar programas</p>
          <p className="hover:underline cursor-pointer">Cambiar configuración</p>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-md p-2">
          <h3 className="font-bold mb-1">Otros sitios</h3>
          <p className="hover:underline cursor-pointer">Mis sitios de red</p>
          <p
            className="hover:underline cursor-pointer"
            onClick={() => openApp("mydocs", "Mis documentos", "mydocs", undefined, { width: 580, height: 400 })}
          >
            Mis documentos
          </p>
          <p className="hover:underline cursor-pointer">Documentos compartidos</p>
          <p className="hover:underline cursor-pointer">Panel de control</p>
        </div>
      </XPSidebar>
      <div className="flex-1 p-4 overflow-auto bg-white">
        <h3 className="text-xs font-bold text-gray-700 mb-2">Archivos almacenados en el equipo</h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            {
              icon: "📁",
              name: "Documentos compartidos",
              onClick: () => openApp("shared", "Documentos compartidos", "mydocs", { folder: "Compartidos" }, { width: 580, height: 400 }),
            },
            {
              icon: "📁",
              name: "Documentos de Usuario",
              onClick: () => openApp("mydocs", "Mis documentos", "mydocs", undefined, { width: 580, height: 400 }),
            },
          ].map((d, i) => (
            <button
              key={i}
              onDoubleClick={d.onClick}
              className="flex flex-col items-center p-2 hover:bg-blue-100 rounded"
            >
              <span className="text-3xl mb-1">{d.icon}</span>
              <span className="text-xs text-center">{d.name}</span>
            </button>
          ))}
        </div>
        <h3 className="text-xs font-bold text-gray-700 mb-2">Unidades de disco duro</h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <button className="flex flex-col items-center p-2 hover:bg-blue-100 rounded">
            <span className="text-3xl mb-1">💿</span>
            <span className="text-xs text-center">Disco local (C:)</span>
            <div className="w-20 h-1 bg-gray-200 rounded mt-1 overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: "62%" }} />
            </div>
            <span className="text-[10px] text-gray-700 mt-0.5">28 GB libres de 75 GB</span>
          </button>
        </div>
        <h3 className="text-xs font-bold text-gray-700 mb-2">Dispositivos con almacenamiento extraíble</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "💾", name: "Disco 3½ (A:)" },
            { icon: "📀", name: "DVD-RW (D:)" },
          ].map((d, i) => (
            <button key={i} className="flex flex-col items-center p-2 hover:bg-blue-100 rounded">
              <span className="text-3xl mb-1">{d.icon}</span>
              <span className="text-xs text-center">{d.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
