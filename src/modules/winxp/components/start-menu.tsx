"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  CalcIcon,
  ControlPanelIcon,
  IEIcon,
  MediaPlayerIcon,
  MessengerIcon,
  MinesIcon,
  MovieMakerIcon,
  MyComputerIcon,
  NotepadIcon,
  OutlookIcon,
  PaintIcon,
  SolitaireIcon,
} from "@/modules/winxp/components/icons"

export type LaunchKey =
  | "ie"
  | "outlook"
  | "mediaplayer"
  | "messenger"
  | "moviemaker"
  | "paint"
  | "notepad"
  | "calc"
  | "minesweeper"
  | "solitaire"
  | "mydocs"
  | "mypc"
  | "controlpanel"

interface StartMenuProps {
  open: boolean
  onClose: () => void
  onShutdown: () => void
  onLaunch: (key: LaunchKey) => void
}

interface AppRow {
  icon: React.ReactNode
  label: string
  desc?: string
  key: LaunchKey
  bold?: boolean
}

function StaticIcon({ src, size = 24, alt }: { src: string; size?: number; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={size} height={size} draggable={false} style={{ width: size, height: size }} />
  )
}

const FREQ_APPS: AppRow[] = [
  { icon: <IEIcon size={32} />, label: "Internet", desc: "Internet Explorer", key: "ie", bold: true },
  { icon: <OutlookIcon size={32} />, label: "E-mail", desc: "Outlook Express", key: "outlook", bold: true },
]

const RECENT_APPS: AppRow[] = [
  { icon: <MediaPlayerIcon size={26} />, label: "Windows Media Player", key: "mediaplayer" },
  { icon: <MessengerIcon size={26} />, label: "Windows Messenger", key: "messenger" },
  { icon: <MovieMakerIcon size={26} />, label: "Tour Windows XP", key: "moviemaker" },
  { icon: <StaticIcon src="/winxp-icons/my-documents.png" size={26} alt="Wizard" />, label: "Files and Settings Transfer Wizard", key: "mydocs" },
]

const ALL_PROGRAMS: AppRow[] = [
  { icon: <PaintIcon size={20} />, label: "Paint", key: "paint" },
  { icon: <NotepadIcon size={20} />, label: "Bloc de notas", key: "notepad" },
  { icon: <CalcIcon size={20} />, label: "Calculadora", key: "calc" },
  { icon: <MinesIcon size={20} />, label: "Buscaminas", key: "minesweeper" },
  { icon: <SolitaireIcon size={20} />, label: "Solitario", key: "solitaire" },
]

const RIGHT_COLUMN: {
  icon: React.ReactNode
  name: string
  key?: LaunchKey
  separator?: boolean
  bold?: boolean
}[] = [
  { icon: <StaticIcon src="/winxp-icons/my-documents.png" size={26} alt="My Documents" />, name: "My Documents", key: "mydocs", bold: true },
  { icon: <StaticIcon src="/winxp-icons/recent-docs.png" size={26} alt="Recent" />, name: "My Recent Documents" },
  { icon: <StaticIcon src="/winxp-icons/my-pictures.png" size={26} alt="Pictures" />, name: "My Pictures", bold: true },
  { icon: <StaticIcon src="/winxp-icons/my-music.png" size={26} alt="Music" />, name: "My Music", bold: true },
  { icon: <MyComputerIcon size={26} />, name: "My Computer", key: "mypc", bold: true, separator: true },
  { icon: <ControlPanelIcon size={26} />, name: "Control Panel", key: "controlpanel" },
  { icon: <StaticIcon src="/winxp-icons/default-programs.png" size={26} alt="Set programs" />, name: "Set Program Access and Defaults" },
  { icon: <StaticIcon src="/winxp-icons/printers.png" size={26} alt="Printers" />, name: "Printers and Faxes", separator: true },
  { icon: <StaticIcon src="/winxp-icons/help.png" size={26} alt="Help" />, name: "Help and Support" },
  { icon: <StaticIcon src="/winxp-icons/search.png" size={26} alt="Search" />, name: "Search" },
  { icon: <StaticIcon src="/winxp-icons/run.png" size={26} alt="Run" />, name: "Run..." },
]

export function StartMenu({ open, onClose, onShutdown, onLaunch }: StartMenuProps) {
  const [allProgsOpen, setAllProgsOpen] = useState(false)

  const launchAndClose = (k: LaunchKey) => {
    onLaunch(k)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-[30px] left-0 w-[400px] z-[9999] text-black select-none overflow-visible bg-white"
            style={{
              fontFamily: '"Tahoma", "Trebuchet MS", sans-serif',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              boxShadow: "0 -2px 18px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,40,120,0.5)",
              border: "1px solid #245edb",
            }}
          >
            {/* HEADER - blue gradient with avatar */}
            <div
              className="flex items-center gap-3 px-3 pt-2 pb-2"
              style={{
                background:
                  "linear-gradient(to bottom, #2c8aea 0%, #2c8aea 5%, #1d76d8 45%, #0f59c8 100%)",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderBottom: "2px solid #ffbb00",
              }}
            >
              <div
                className="w-12 h-12 rounded-md flex items-center justify-center overflow-hidden"
                style={{
                  border: "2px solid #fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
                  background: "linear-gradient(135deg, #d9532b 0%, #951f12 100%)",
                }}
              >
                <StaticIcon src="/winxp-icons/user-accounts.png" size={42} alt="User" />
              </div>
              <span
                className="text-white font-bold text-[16px]"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.6)" }}
              >
                Usuario
              </span>
            </div>

            {/* BODY - two columns */}
            <div className="flex" style={{ background: "#fff" }}>
              {/* LEFT column */}
              <div className="flex-1 p-1.5" style={{ background: "#fff" }}>
                {FREQ_APPS.map((it, i) => (
                  <button
                    key={i}
                    onClick={() => launchAndClose(it.key)}
                    className="w-full px-2 py-1 flex items-center gap-2 hover:bg-[#316ac5] hover:text-white rounded text-[11px] text-left group"
                  >
                    <span className="shrink-0">{it.icon}</span>
                    <span className="flex flex-col leading-tight">
                      <span className="font-bold text-[12px]">{it.label}</span>
                      {it.desc && (
                        <span className="text-[10px] text-gray-600 group-hover:text-white/90">
                          {it.desc}
                        </span>
                      )}
                    </span>
                  </button>
                ))}
                <div className="border-t border-blue-200 my-1 mx-1" />
                {RECENT_APPS.map((it, i) => (
                  <button
                    key={i}
                    onClick={() => launchAndClose(it.key)}
                    className="w-full px-2 py-[3px] flex items-center gap-2 hover:bg-[#316ac5] hover:text-white rounded text-[11.5px] text-left"
                  >
                    <span className="shrink-0">{it.icon}</span>
                    <span className="truncate">{it.label}</span>
                  </button>
                ))}
                <div className="border-t border-blue-200 my-1 mx-1" />
                <button
                  onClick={() => setAllProgsOpen((s) => !s)}
                  className="w-full px-2 py-1 flex items-center gap-2 hover:bg-[#316ac5] hover:text-white rounded text-[12px] text-left font-bold relative"
                >
                  <span
                    className="w-6 h-6 flex items-center justify-center rounded shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #6db8ff 0%, #2d5fcb 100%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                      <path d="M 3 2 L 3 5 L 6 5 L 6 2 Z M 7 2 L 7 5 L 10 5 L 10 2 Z M 3 6 L 3 9 L 6 9 L 6 6 Z M 7 6 L 7 9 L 10 9 L 10 6 Z" />
                    </svg>
                  </span>
                  All Programs
                  <span className="ml-auto text-[10px]">▶</span>
                </button>
                {allProgsOpen && (
                  <div
                    className="absolute left-full top-12 bg-white border-2 border-gray-400 shadow-2xl w-56 py-1 text-[11.5px]"
                    style={{ borderColor: "#0a246a" }}
                  >
                    {ALL_PROGRAMS.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          launchAndClose(p.key)
                          setAllProgsOpen(false)
                        }}
                        className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-[#316ac5] hover:text-white text-left"
                      >
                        <span className="shrink-0">{p.icon}</span>
                        {p.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT column */}
              <div
                className="w-[200px] p-1.5"
                style={{ background: "#d3e5fa", borderLeft: "1px solid #cad8ea" }}
              >
                {RIGHT_COLUMN.map((it, i) => (
                  <div key={i}>
                    <button
                      onClick={() => it.key && launchAndClose(it.key)}
                      className="w-full px-2 py-[3px] flex items-center gap-2 hover:bg-[#316ac5] hover:text-white rounded text-[11.5px] text-left"
                    >
                      <span className="shrink-0">{it.icon}</span>
                      <span
                        className={it.bold ? "font-bold text-[#0c3d8c]" : "text-[#0c3d8c]"}
                      >
                        {it.name}
                      </span>
                    </button>
                    {it.separator && <div className="border-t border-blue-300 my-1 mx-1" />}
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER - Log off / Turn off computer */}
            <div
              className="flex items-center justify-end gap-4 px-3 py-1.5"
              style={{
                background:
                  "linear-gradient(to bottom, #2c8aea 0%, #1d76d8 45%, #0f59c8 100%)",
                borderTop: "2px solid #ffbb00",
              }}
            >
              <button
                onClick={onClose}
                className="flex items-center gap-1 px-2 py-1 text-[11.5px] text-white hover:underline"
              >
                <StaticIcon src="/winxp-icons/log-off.png" size={22} alt="Log off" />
                <span style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}>Log Off</span>
              </button>
              <button
                onClick={onShutdown}
                className="flex items-center gap-1 px-2 py-1 text-[11.5px] text-white hover:underline"
              >
                <StaticIcon src="/winxp-icons/power.png" size={22} alt="Turn off" />
                <span style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}>Turn Off Computer</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
