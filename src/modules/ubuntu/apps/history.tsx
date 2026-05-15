"use client"

export function HistoryView() {
  return (
    <div className="h-full overflow-y-auto bg-white p-6 text-sm text-black">
      <h2 className="text-2xl font-bold text-[#E95420] mb-4">Historia de Linux</h2>
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg">1991 — El nacimiento</h3>
          <p>Linus Torvalds, estudiante en Helsinki, anuncia un kernel libre como hobby:</p>
          <p className="italic text-gray-600 border-l-4 border-gray-300 pl-3 my-2">
            &quot;I&apos;m doing a (free) operating system (just a hobby, won&apos;t be big and professional like gnu)...&quot;
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">1992-1996 — La adopción</h3>
          <p>
            Linux adopta GNU GPL. Aparecen Slackware, Debian, Red Hat. Linux 2.0 con SMP. Tux se vuelve mascota.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">2004 — Ubuntu</h3>
          <p>
            Canonical lanza Ubuntu 4.10 &quot;Warty Warthog&quot;: Linux para seres humanos. Hace accesible Linux para millones.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">2008+ — Android y la nube</h3>
          <p>
            Android (basado en Linux) llega a +3000 millones de dispositivos. Linux domina servidores, supercomputadoras y la nube.
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#E95420] to-[#772953] text-white p-4 rounded-xl mt-4">
          <h3 className="font-bold text-lg mb-2">Hoy, Linux corre:</h3>
          <ul className="space-y-1 text-sm">
            <li>• 96% de los servidores web del top 1M</li>
            <li>• 100% de las top 500 supercomputadoras</li>
            <li>• Todos los dispositivos Android (3+ mil millones)</li>
            <li>• La Estación Espacial Internacional</li>
            <li>• Tesla, Steam Deck, smart TVs, routers</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
