"use client"

import { useState } from "react"

const PAGES = 8

export function NotePad() {
  const [pages, setPages] = useState<string[]>(() => Array(PAGES).fill(""))
  const [page, setPage] = useState(0)
  return (
    <div
      className="h-full bg-[#fffce8] flex flex-col text-black"
      style={{ fontFamily: "'ChicagoFLF', 'Geneva', sans-serif" }}
    >
      <div className="border-b-2 border-black px-2 py-1 flex items-center gap-2 text-xs">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className="border border-black bg-white px-2"
        >
          ◀
        </button>
        <span>
          Page {page + 1} / {PAGES}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(PAGES - 1, p + 1))}
          className="border border-black bg-white px-2"
        >
          ▶
        </button>
      </div>
      <textarea
        value={pages[page]}
        onChange={(e) => {
          const p = [...pages]
          p[page] = e.target.value
          setPages(p)
        }}
        className="flex-1 p-3 bg-[#fffce8] outline-none resize-none text-sm leading-6 text-black"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 23px, rgba(0,0,0,0.15) 23px 24px)",
        }}
        placeholder="Write your note..."
      />
    </div>
  )
}
