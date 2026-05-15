"use client"

import { motion, AnimatePresence } from "framer-motion"

interface NotificationCenterProps {
  open: boolean
  time: Date
  onClose: () => void
}

const CITIES = [
  { city: "Buenos Aires", offset: 0 },
  { city: "Tokyo", offset: 12 },
  { city: "London", offset: 4 },
  { city: "New York", offset: -1 },
]

export function NotificationCenter({ open, time, onClose }: NotificationCenterProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={onClose} />
          <motion.div
            initial={{ x: 360 }}
            animate={{ x: 0 }}
            exit={{ x: 360 }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute right-2 top-9 bottom-20 w-[340px] bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 z-[9999] p-3 overflow-y-auto text-white"
          >
            <div className="space-y-3">
              <Widget title="Calendario">
                <div className="text-3xl font-light">{time.getDate()}</div>
                <div className="text-xs opacity-80 capitalize">
                  {time.toLocaleDateString("es-ES", { weekday: "long", month: "long" })}
                </div>
              </Widget>

              <Widget title="Clima">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">☀️</div>
                  <div>
                    <div className="text-2xl font-light">22°</div>
                    <div className="text-xs opacity-80">Soleado · Buenos Aires</div>
                  </div>
                </div>
              </Widget>

              <Widget title="Reloj mundial">
                <div className="space-y-1 text-sm">
                  {CITIES.map((c) => (
                    <div key={c.city} className="flex justify-between">
                      <span>{c.city}</span>
                      <span className="font-mono">
                        {String((time.getHours() + c.offset + 24) % 24).padStart(2, "0")}:
                        {String(time.getMinutes()).padStart(2, "0")}
                      </span>
                    </div>
                  ))}
                </div>
              </Widget>

              <Widget title="Notas rápidas">
                <div className="text-sm">Recordatorio: revisar el simulador macOS hoy</div>
              </Widget>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function Widget({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/10 rounded-xl p-3">
      <div className="text-xs opacity-70 mb-1 uppercase tracking-wider">{title}</div>
      {children}
    </div>
  )
}
