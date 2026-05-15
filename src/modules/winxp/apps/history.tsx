"use client"

import { XPSidebar } from "@/modules/winxp/components/xp-sidebar"

export function HistoryView() {
  return (
    <div className="h-full bg-white flex text-black">
      <XPSidebar>
        <div className="bg-white/10 backdrop-blur rounded-md p-2">
          <h3 className="font-bold mb-1">Contenido</h3>
          <p className="hover:underline cursor-pointer">Introducción</p>
          <p className="hover:underline cursor-pointer">Características</p>
          <p className="hover:underline cursor-pointer">Legado</p>
        </div>
      </XPSidebar>
      <div className="flex-1 p-4 overflow-auto text-sm">
        <h2 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
          <span>🪟</span> Historia de Windows XP
        </h2>
        <p>
          <strong>Lanzamiento:</strong> 25 de octubre de 2001
        </p>
        <p>
          <strong>Nombre código:</strong> Whistler
        </p>
        <p>
          <strong>Significado:</strong> XP = eXPerience
        </p>
        <div className="bg-blue-50 p-3 rounded-lg mt-3">
          <h3 className="font-bold text-blue-800 mb-2">Características</h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>El famoso fondo &quot;Bliss&quot;</li>
            <li>Interfaz Luna con bordes redondeados</li>
            <li>Menú Inicio renovado de dos columnas</li>
            <li>ClearType para mejor lectura</li>
            <li>Restaurar sistema mejorado</li>
            <li>Windows Media Player integrado</li>
          </ul>
        </div>
        <div className="bg-green-50 p-3 rounded-lg mt-3">
          <h3 className="font-bold text-green-800 mb-2">Datos curiosos</h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>Soporte oficial hasta abril de 2014 (13 años)</li>
            <li>La foto Bliss fue tomada en California por Charles O&apos;Rear</li>
            <li>Una de las fotos mejor pagadas de la historia</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
