"use client"

export function HistoryView() {
  return (
    <div
      className="p-4 bg-white text-sm overflow-y-auto h-full text-black"
      style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
    >
      <h2 className="text-base font-bold mb-3 text-center">La era dorada de Windows</h2>
      <section className="mb-3">
        <h3 className="font-bold">Contexto (1985-1991)</h3>
        <p>Windows 1.0 y 2.0 fueron intentos modestos. Windows 3.0 (1990) fue el primer éxito real.</p>
      </section>
      <section className="mb-3">
        <h3 className="font-bold">Windows 3.1 (1992)</h3>
        <p>Conocido internamente como &quot;Janus&quot;:</p>
        <ul className="list-disc list-inside ml-2">
          <li>Fuentes TrueType escalables</li>
          <li>Modo protegido mejorado</li>
          <li>Drag &amp; drop entre apps</li>
          <li>Multimedia con sonido y video</li>
        </ul>
      </section>
      <section className="mb-3">
        <h3 className="font-bold">Impacto cultural</h3>
        <p>El Solitario enseñó a millones a usar el ratón; el Buscaminas se volvió un fenómeno.</p>
      </section>
      <section>
        <h3 className="font-bold">Legado</h3>
        <p>+25 millones de copias vendidas; abrió el camino para Windows 95.</p>
      </section>
    </div>
  )
}
