"use client"

export function HistoryView() {
  return (
    <div className="h-full bg-gray-50 overflow-y-auto text-black">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Historia de macOS</h1>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-blue-600 mb-2">2001 - Mac OS X</h3>
            <p className="text-sm text-gray-600">
              Apple lanzó Mac OS X, basado en NeXTSTEP y Darwin (Unix). Introdujo Aqua con efectos translúcidos.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-blue-600 mb-2">Evolución de nombres</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>2001-2012:</strong> Mac OS X (felinos)</li>
              <li>• <strong>2012-2016:</strong> OS X (lugares de California)</li>
              <li>• <strong>2016-presente:</strong> macOS</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-blue-600 mb-2">Versiones</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>• Cheetah (10.0)</div>
              <div>• Tiger (10.4)</div>
              <div>• Leopard (10.5)</div>
              <div>• Snow Leopard (10.6)</div>
              <div>• Lion (10.7)</div>
              <div>• Yosemite (10.10)</div>
              <div>• Big Sur (11)</div>
              <div>• Sonoma (14)</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-xl text-white">
            <h3 className="font-semibold mb-2">Innovaciones</h3>
            <ul className="text-sm space-y-1">
              <li>✓ Time Machine</li>
              <li>✓ Spotlight</li>
              <li>✓ Mission Control</li>
              <li>✓ Handoff (continuidad)</li>
              <li>✓ Apple Silicon (M1/M2/M3)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
