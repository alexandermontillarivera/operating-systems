"use client"

import { Win7Sidebar } from "@/modules/win7/components/sidebar"

export function Computer() {
  return (
    <div className="h-full bg-white flex text-black">
      <Win7Sidebar
        items={[
          { icon: "📁", label: "Escritorio" },
          { icon: "⬇️", label: "Descargas" },
          { icon: "📄", label: "Documentos" },
        ]}
      />
      <div className="flex-1 p-4">
        <div className="text-sm text-gray-500 mb-4 font-semibold">Unidades de disco duro</div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 hover:bg-blue-100 rounded cursor-pointer">
            <span className="text-4xl">💾</span>
            <div className="flex-1">
              <div className="text-sm font-medium">Disco local (C:)</div>
              <div className="w-full bg-gray-200 h-1.5 rounded mt-1 overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: "65%" }} />
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">185 GB libres de 500 GB</div>
            </div>
          </div>
          <div className="flex flex-col items-center p-3 hover:bg-blue-100 rounded cursor-pointer">
            <span className="text-3xl mb-1">💿</span>
            <div className="text-xs">DVD-RW (D:)</div>
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-2 mt-4 font-semibold">
          Dispositivos con almacenamiento extraíble
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center p-3 hover:bg-blue-100 rounded cursor-pointer">
            <span className="text-3xl mb-1">📦</span>
            <div className="text-xs">USB (E:)</div>
          </div>
        </div>
      </div>
    </div>
  )
}
