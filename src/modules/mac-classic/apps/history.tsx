"use client"

export function HistoryApp() {
  return (
    <div
      className="h-full bg-white p-4 overflow-y-auto text-sm text-black"
      style={{ fontFamily: "'ChicagoFLF', 'Geneva', sans-serif" }}
    >
      <h2 className="text-base font-bold mb-3 border-b-2 border-black pb-1">
        Historia del Macintosh
      </h2>
      <p className="mb-2">
        <strong>Lanzamiento:</strong> 24 de enero de 1984
      </p>
      <p className="mb-2">
        <strong>Precio original:</strong> $2,495 USD
      </p>
      <div className="border-t border-black pt-2 mt-2">
        <h3 className="font-bold mb-1">Innovaciones</h3>
        <ul className="list-disc ml-5 text-xs space-y-1">
          <li>Primera PC con GUI exitosa</li>
          <li>Introdujo el ratón al usuario común</li>
          <li>Sistema de archivos visual</li>
          <li>Menú en barra superior</li>
          <li>Drag and drop</li>
        </ul>
      </div>
      <div className="border-t border-black pt-2 mt-2">
        <h3 className="font-bold mb-1">Evolución</h3>
        <ul className="text-xs space-y-1">
          <li>
            <strong>1984:</strong> Macintosh 128K
          </li>
          <li>
            <strong>1987:</strong> Macintosh II (color)
          </li>
          <li>
            <strong>1991:</strong> System 7
          </li>
          <li>
            <strong>1997:</strong> Mac OS 8
          </li>
          <li>
            <strong>2001:</strong> Mac OS X
          </li>
        </ul>
      </div>
    </div>
  )
}
