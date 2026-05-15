"use client"

export function HistoryView() {
  return (
    <div className="p-6 bg-white text-sm overflow-y-auto h-full text-black">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Windows 7 — La redención de Microsoft</h2>
      <div className="space-y-3">
        <section>
          <h3 className="font-bold text-lg text-blue-800">Contexto: el desastre de Vista (2007)</h3>
          <p>Vista fue criticado por rendimiento y compatibilidad. Microsoft necesitaba redimirse.</p>
        </section>
        <section>
          <h3 className="font-bold text-lg text-blue-800">El desarrollo (2008-2009)</h3>
          <p>Internamente conocido como Windows 7 desde el inicio:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Mejor rendimiento que Vista en el mismo hardware</li>
            <li>Compatibilidad mejorada</li>
            <li>Interfaz refinada pero familiar</li>
            <li>Menor consumo de recursos</li>
          </ul>
        </section>
        <section>
          <h3 className="font-bold text-lg text-blue-800">Innovaciones</h3>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Aero Peek/Snap:</strong> gestión de ventanas revolucionaria</li>
            <li><strong>Jump Lists:</strong> tareas frecuentes</li>
            <li><strong>Superbar:</strong> previsualizaciones en taskbar</li>
            <li><strong>Libraries:</strong> organización virtual</li>
            <li><strong>HomeGroup:</strong> redes domésticas</li>
            <li><strong>Touch:</strong> soporte táctil nativo</li>
          </ul>
        </section>
        <section>
          <h3 className="font-bold text-lg text-blue-800">22 de octubre de 2009</h3>
          <p>+630 millones de licencias en 3 años. SO de más rápido crecimiento de la historia.</p>
        </section>
      </div>
    </div>
  )
}
