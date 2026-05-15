"use client"

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
}

const items = [
  "Organizar iconos",
  "Alinear iconos",
  "—",
  "Pegar",
  "Pegar acceso directo",
  "—",
  "Nuevo",
  "—",
  "Propiedades",
]

export function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  return (
    <>
      <div className="fixed inset-0 z-[10000]" onClick={onClose} />
      <div
        className="fixed bg-[#c0c0c0] z-[10001] py-1 text-[11px]"
        style={{
          left: x,
          top: y,
          minWidth: 180,
          fontFamily: "Tahoma, 'MS Sans Serif', sans-serif",
          boxShadow:
            "inset -1px -1px 0 0 #000000, inset 1px 1px 0 0 #dfdfdf, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #ffffff",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((it, i) =>
          it === "—" ? (
            <div
              key={i}
              className="my-1 mx-1 h-px"
              style={{ background: "linear-gradient(to bottom, #808080 50%, #fff 50%)" }}
            />
          ) : (
            <button
              key={i}
              onClick={onClose}
              className="w-full px-4 py-0.5 text-left hover:bg-[#000080] hover:text-white"
            >
              {it}
            </button>
          ),
        )}
      </div>
    </>
  )
}
