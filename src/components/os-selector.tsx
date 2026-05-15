"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface OSInfo {
  id: string
  name: string
  year: string
  description: string
  icon: React.ReactNode
  color: string
  category: "terminal" | "gui" | "linux"
}

const operatingSystems: OSInfo[] = [
  // Terminal Era
  {
    id: "unix",
    name: "UNIX",
    year: "1969",
    description: "El abuelo de todos los sistemas modernos. Creado en Bell Labs, sentó las bases de Linux, macOS y más",
    icon: (
      <div className="font-serif font-bold text-base text-black bg-amber-50 tracking-[0.25em] px-2.5 py-1 rounded-sm shadow-inner border border-amber-200/70">
        UNIX
      </div>
    ),
    color: "from-amber-900 to-amber-950",
    category: "terminal"
  },
  {
    id: "cpm",
    name: "CP/M",
    year: "1974",
    description: "El primer SO para microcomputadoras comerciales. MS-DOS heredó su diseño",
    icon: (
      <div className="font-mono text-lg text-white flex items-center">
        <span>A&gt;</span>
        <span className="inline-block w-1.5 h-3.5 bg-white ml-0.5 animate-pulse" />
      </div>
    ),
    color: "from-blue-800 to-blue-950",
    category: "terminal"
  },
  {
    id: "apple2",
    name: "Apple II",
    year: "1977",
    description: "El computador que comenzó la revolución del PC. BASIC integrado y gráficos a color",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" aria-label="Apple rainbow logo">
        <defs>
          <linearGradient id="apple2-rainbow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#5BCC4D" />
            <stop offset="20%" stopColor="#FFCB05" />
            <stop offset="40%" stopColor="#FF6F1F" />
            <stop offset="60%" stopColor="#E91E63" />
            <stop offset="80%" stopColor="#9C27B0" />
            <stop offset="100%" stopColor="#03A9F4" />
          </linearGradient>
        </defs>
        <path fill="url(#apple2-rainbow)" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
    color: "from-green-800 to-black",
    category: "terminal"
  },
  {
    id: "dos",
    name: "MS-DOS",
    year: "1981",
    description: "El sistema operativo de disco de Microsoft que dominó los PCs en los 80s",
    icon: (
      <div className="font-mono text-base text-green-400 flex items-center">
        <span>C:\&gt;</span>
        <span className="inline-block w-1.5 h-4 bg-green-400 ml-0.5 animate-pulse" />
      </div>
    ),
    color: "from-green-900 to-black",
    category: "terminal"
  },
  {
    id: "bsd",
    name: "BSD",
    year: "1977",
    description: "Berkeley Software Distribution. Creó TCP/IP, vi, csh. Base de macOS, PlayStation y Netflix",
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" aria-label="BSD daemon">
        {/* Cuernos */}
        <polygon points="11,11 13,3 16,11" fill="#DC2626" />
        <polygon points="29,11 27,3 24,11" fill="#DC2626" />
        {/* Cabeza */}
        <ellipse cx="20" cy="22" rx="11" ry="12" fill="#DC2626" />
        {/* Ojos */}
        <circle cx="16" cy="20" r="1.6" fill="white" />
        <circle cx="24" cy="20" r="1.6" fill="white" />
        <circle cx="16" cy="20.3" r="0.7" fill="black" />
        <circle cx="24" cy="20.3" r="0.7" fill="black" />
        {/* Sonrisa diabólica */}
        <path d="M 14 26 Q 20 30 26 26" stroke="#7F1D1D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* Tridente */}
        <line x1="35" y1="6" x2="35" y2="32" stroke="#FCD34D" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M 31 8 L 35 4 L 39 8 M 35 4 L 35 12" stroke="#FCD34D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    ),
    color: "from-red-900 to-red-950",
    category: "terminal"
  },
  // GUI Era - Apple
  {
    id: "macclassic",
    name: "Mac OS Classic",
    year: "1984",
    description: "El sistema de Apple que introdujo la interfaz gráfica al usuario común con el Macintosh",
    icon: (
      <div className="w-10 h-10 bg-gradient-to-b from-[#dcdcdc] to-[#a8a8a8] rounded-md flex flex-col items-center justify-center border border-gray-600 p-0.5 shadow-inner">
        <div className="w-7 h-5 bg-[#cfd8d0] rounded-sm border border-gray-700 flex items-center justify-center">
          <svg viewBox="0 0 20 16" className="w-5 h-4">
            <circle cx="6.5" cy="6" r="1.1" fill="black" />
            <circle cx="13.5" cy="6" r="1.1" fill="black" />
            <path d="M 5.5 10 Q 10 13.5 14.5 10" stroke="black" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <div className="w-2 h-0.5 bg-gray-700 mt-0.5 rounded-full" />
      </div>
    ),
    color: "from-gray-300 to-gray-500",
    category: "gui"
  },
  // GUI Era - Windows
  {
    id: "win31",
    name: "Windows 3.1",
    year: "1992",
    description: "El Windows que conquistó el mundo corporativo. Program Manager, Solitario y fuentes TrueType",
    icon: (
      <div className="w-10 h-10 bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] flex items-center justify-center">
        <div className="grid grid-cols-2 gap-px w-6 h-6">
          <div className="bg-[#FF0000]" />
          <div className="bg-[#00B050]" />
          <div className="bg-[#0070C0]" />
          <div className="bg-[#FFC000]" />
        </div>
      </div>
    ),
    color: "from-teal-600 to-teal-800",
    category: "gui"
  },
  {
    id: "win95",
    name: "Windows 95",
    year: "1995",
    description: "Revolucionó la computación personal con su interfaz gráfica y el botón Inicio",
    icon: (
      <div className="w-10 h-10 flex items-center justify-center">
        <div
          className="grid grid-cols-2 gap-0.5 w-8 h-7"
          style={{ transform: "perspective(60px) rotateY(-22deg) skewY(-7deg)" }}
        >
          <div className="bg-[#FF3030] rounded-tl-sm shadow" />
          <div className="bg-[#3CB371] rounded-tr-sm shadow" />
          <div className="bg-[#1E90FF] rounded-bl-sm shadow" />
          <div className="bg-[#FFD700] rounded-br-sm shadow" />
        </div>
      </div>
    ),
    color: "from-teal-700 to-teal-900",
    category: "gui"
  },
  {
    id: "winxp",
    name: "Windows XP",
    year: "2001",
    description: "Uno de los sistemas más queridos, conocido por su estabilidad y el fondo Bliss",
    icon: (
      <div className="w-10 h-10 flex items-center justify-center">
        <div
          className="grid grid-cols-2 gap-0.5 w-8 h-7 drop-shadow-md"
          style={{ transform: "perspective(70px) rotateY(-18deg) skewY(-6deg)" }}
        >
          <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-tl-md" />
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-tr-md" />
          <div className="bg-gradient-to-br from-blue-400 to-blue-700 rounded-bl-md" />
          <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-br-md" />
        </div>
      </div>
    ),
    color: "from-blue-600 to-green-500",
    category: "gui"
  },
  {
    id: "win7",
    name: "Windows 7",
    year: "2009",
    description: "La redención de Microsoft tras Vista. Aero Glass, Superbar y la mejor versión de Windows para muchos",
    icon: (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-300 via-blue-500 to-blue-900 flex items-center justify-center shadow-lg shadow-blue-500/50 ring-2 ring-blue-300/40 ring-offset-1 ring-offset-blue-950">
        <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
          <div className="bg-orange-400 rounded-tl-full" />
          <div className="bg-green-400 rounded-tr-full" />
          <div className="bg-blue-300 rounded-bl-full" />
          <div className="bg-yellow-300 rounded-br-full" />
        </div>
      </div>
    ),
    color: "from-blue-700 to-blue-900",
    category: "gui"
  },
  // macOS Modern
  {
    id: "macos",
    name: "macOS",
    year: "2001+",
    description: "El sistema moderno de Apple con su elegante dock y diseño minimalista",
    icon: (
      <div className="w-10 h-10 bg-gradient-to-b from-gray-700 to-gray-900 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      </div>
    ),
    color: "from-gray-800 to-gray-950",
    category: "gui"
  },
  // Linux
  {
    id: "ubuntu",
    name: "Ubuntu",
    year: "2004",
    description: "Linux para seres humanos. La distribución que hizo Linux accesible para todos",
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" aria-label="Ubuntu Circle of Friends">
        <circle cx="20" cy="20" r="18" fill="#E95420" />
        <circle cx="20" cy="20" r="9" fill="none" stroke="white" strokeWidth="2.4" />
        <circle cx="32" cy="20" r="3.6" fill="white" />
        <circle cx="14" cy="11" r="3.6" fill="white" />
        <circle cx="14" cy="29" r="3.6" fill="white" />
        {/* gaps in ring at dot positions */}
        <circle cx="32" cy="20" r="5.2" fill="#E95420" />
        <circle cx="14" cy="11" r="5.2" fill="#E95420" />
        <circle cx="14" cy="29" r="5.2" fill="#E95420" />
        {/* re-draw inner dots on top */}
        <circle cx="32" cy="20" r="3.4" fill="white" />
        <circle cx="14" cy="11" r="3.4" fill="white" />
        <circle cx="14" cy="29" r="3.4" fill="white" />
      </svg>
    ),
    color: "from-orange-600 to-orange-800",
    category: "linux"
  },
  {
    id: "arch",
    name: "Arch Linux",
    year: "2002",
    description: "Para los puristas. KISS - Keep It Simple, Stupid. El sistema que construyes desde cero",
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" aria-label="Arch Linux logo">
        {/* Triángulo principal */}
        <polygon points="20,3 37,37 3,37" fill="#1793D1" />
        {/* Línea interior */}
        <polygon points="20,10 32,34 8,34" fill="none" stroke="#0F6BA0" strokeWidth="1.4" />
        {/* Highlight superior */}
        <polygon points="20,3 22,7 18,7" fill="white" fillOpacity="0.45" />
        {/* "Colmillos" inferiores */}
        <polygon points="12,37 16,30 20,37" fill="#0F4F7A" />
        <polygon points="20,37 24,30 28,37" fill="#0F4F7A" />
      </svg>
    ),
    color: "from-blue-700 to-blue-950",
    category: "linux"
  }
]

interface OSSelectorProps {
  onSelect: (id: string) => void
}

export function OSSelector({ onSelect }: OSSelectorProps) {
  const [filter, setFilter] = useState<"all" | "terminal" | "gui" | "linux">("all")

  const filteredOS = filter === "all" 
    ? operatingSystems 
    : operatingSystems.filter(os => os.category === filter)

  const categories = [
    { id: "all", label: "Todos", icon: "🖥️" },
    { id: "terminal", label: "Era Terminal", icon: "⌨️" },
    { id: "gui", label: "Interfaces Gráficas", icon: "🪟" },
    { id: "linux", label: "Linux", icon: "🐧" }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="py-8 px-4 text-center border-b border-border/50">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-foreground mb-4"
        >
          Historia de los Sistemas Operativos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.05, ease: "easeOut" }}
          className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto"
        >
          Explora la evolución desde UNIX en 1969 hasta los sistemas modernos.
          Haz clic en cualquier sistema para explorarlo interactivamente.
        </motion.p>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-2 mt-6"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as typeof filter)}
              className={`px-4 py-2 rounded-full text-sm transition-colors duration-150 flex items-center gap-2 ${
                filter === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </motion.div>
      </header>

      {/* OS Grid */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredOS.map((os) => (
              <motion.button
                key={os.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                whileHover={{ y: -3, transition: { duration: 0.15, ease: "easeOut" } }}
                whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                onClick={() => onSelect(os.id)}
                className={`bg-gradient-to-br ${os.color} p-6 rounded-xl border border-border/30 text-left transition-shadow duration-200 hover:shadow-2xl hover:shadow-primary/10 group relative overflow-hidden will-change-transform`}
              >
                  {/* Year badge */}
                  <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm px-2 py-1 rounded text-xs text-white/80 font-mono">
                    {os.year}
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-black/20 rounded-xl backdrop-blur-sm">
                      {os.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-bold text-white truncate">{os.name}</h3>
                      <span className="text-xs text-white/60 uppercase tracking-wider">
                        {os.category === "terminal" ? "Terminal" : os.category === "gui" ? "GUI" : "Linux"}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                    {os.description}
                  </p>

                  <div className="mt-4 text-white/60 text-sm group-hover:text-white transition-colors duration-150 flex items-center gap-2">
                    Explorar sistema
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none" />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Timeline indicator */}
      <div className="px-4 py-6 border-t border-border/50 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>1969</span>
            <span>Línea del Tiempo</span>
            <span>Presente</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-blue-500 to-green-500 rounded-full"
              style={{ width: "100%" }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>UNIX</span>
            <span>CP/M</span>
            <span>Apple II</span>
            <span>MS-DOS</span>
            <span>Mac</span>
            <span>Windows</span>
            <span>Linux</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-muted-foreground text-sm border-t border-border">
        {filteredOS.length} sistemas operativos disponibles para explorar
      </footer>
    </div>
  )
}
