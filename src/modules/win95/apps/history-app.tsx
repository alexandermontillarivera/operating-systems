"use client"

export function HistoryApp() {
  return (
    <div
      className="h-full bg-white p-4 overflow-y-auto text-sm"
      style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
    >
      <h2 className="text-base font-bold mb-3 text-[#000080]">Historia de Windows 95</h2>
      <p className="mb-1">
        <strong>Lanzamiento:</strong> 24 de agosto de 1995
      </p>
      <p className="mb-1">
        <strong>Nombre código:</strong> Chicago
      </p>
      <p className="border-t pt-2 mt-2 mb-2">
        Windows 95 fue un hito en la historia de la computación. Introdujo una interfaz completamente
        nueva con el icónico botón Inicio y la barra de tareas.
      </p>
      <p className="font-bold mb-1">Innovaciones clave:</p>
      <ul className="list-disc ml-5 space-y-0.5">
        <li>Menú Inicio y barra de tareas</li>
        <li>Soporte para nombres de archivo largos</li>
        <li>Plug and Play</li>
        <li>Multitarea preemptiva de 32 bits</li>
        <li>Internet Explorer (en OSR2)</li>
      </ul>
      <p className="border-t pt-2 mt-3">
        El lanzamiento fue un evento masivo. Microsoft gastó $300 millones en marketing, incluyendo la
        licencia de &quot;Start Me Up&quot; de los Rolling Stones.
      </p>
    </div>
  )
}
