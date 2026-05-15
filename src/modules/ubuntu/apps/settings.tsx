"use client"

import { useState } from "react"

const SECTIONS = [
  { id: "Network", icon: "🌐" },
  { id: "Bluetooth", icon: "🔷" },
  { id: "Background", icon: "🖼️" },
  { id: "Appearance", icon: "🎨" },
  { id: "Notifications", icon: "🔔" },
  { id: "Sound", icon: "🔊" },
  { id: "Power", icon: "🔋" },
  { id: "Displays", icon: "🖥️" },
  { id: "Mouse", icon: "🖱️" },
  { id: "Keyboard", icon: "⌨️" },
  { id: "Privacy", icon: "🔒" },
  { id: "About", icon: "ℹ️" },
] as const

export function Settings() {
  const [section, setSection] = useState<string>("Appearance")
  return (
    <div className="h-full flex bg-white text-black">
      <div className="w-52 bg-[#f5f5f5] border-r border-gray-300 overflow-auto">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`w-full text-left px-3 py-2 flex items-center gap-2 text-sm ${section === s.id ? "bg-[#E95420] text-white" : "hover:bg-gray-200"}`}
          >
            <span>{s.icon}</span> {s.id}
          </button>
        ))}
      </div>
      <div className="flex-1 p-6 overflow-auto">
        {section === "About" ? (
          <AboutSection />
        ) : section === "Appearance" ? (
          <AppearanceSection />
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">{section}</h2>
            <p className="text-sm text-gray-600">Configuración de {section.toLowerCase()}.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function AboutSection() {
  const rows: [string, string][] = [
    ["Hardware Model", "Generic Virtual Machine"],
    ["Memory", "16.0 GiB"],
    ["Processor", "Intel® Core™ i7-9700K @ 3.60GHz × 8"],
    ["Graphics", "Mesa Intel® UHD Graphics 630"],
    ["Disk Capacity", "500 GB"],
    ["GNOME Version", "46"],
    ["Kernel", "Linux 6.8.0-31-generic"],
    ["OS Type", "64-bit"],
  ]
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">About</h2>
      <div className="bg-gradient-to-br from-[#E95420] to-[#772953] text-white rounded-2xl p-6 mb-4 max-w-md">
        <div className="text-4xl font-light">Ubuntu</div>
        <div className="text-sm opacity-80 mt-1">24.04 LTS · Noble Numbat</div>
      </div>
      <div className="space-y-2 text-sm max-w-md">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-gray-200 pb-1">
            <span className="text-gray-600">{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AppearanceSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Appearance</h2>
      <div className="bg-gray-50 rounded-xl p-4 max-w-md mb-4">
        <div className="text-sm font-medium mb-3">Style</div>
        <div className="flex gap-3">
          {["Default", "Dark"].map((m) => (
            <button key={m} className="flex flex-col items-center gap-2">
              <div
                className={`w-24 h-16 rounded-lg border-2 ${m === "Dark" ? "bg-gray-800 border-gray-300" : "bg-white border-[#E95420]"}`}
              />
              <span className="text-xs">{m}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-4 max-w-md">
        <div className="text-sm font-medium mb-3">Accent color</div>
        <div className="flex gap-2 flex-wrap">
          {["#E95420", "#3584E4", "#33D17A", "#F6D32D", "#9141AC", "#E66100", "#000000"].map((c) => (
            <button
              key={c}
              className={`w-8 h-8 rounded-full border-2 ${c === "#E95420" ? "border-gray-800" : "border-transparent"}`}
              style={{ background: c }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
