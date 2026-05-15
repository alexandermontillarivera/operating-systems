"use client"

import { useCallback, useEffect, useState } from "react"
import {
  type Card,
  canPlaceOnFoundation,
  canPlaceOnTableau,
  dealKlondike,
  isRed,
  makeShuffledDeck,
  rankStr,
  SUITS,
} from "@/modules/win31/lib/cards"

export function Solitaire() {
  const [deck, setDeck] = useState<Card[]>([])
  const [waste, setWaste] = useState<Card[]>([])
  const [foundations, setFoundations] = useState<Card[][]>([[], [], [], []])
  const [tableau, setTableau] = useState<Card[][]>([])

  const reset = useCallback(() => {
    const d = makeShuffledDeck()
    const { tableau: tab, remainder } = dealKlondike(d)
    setTableau(tab)
    setDeck(remainder)
    setWaste([])
    setFoundations([[], [], [], []])
  }, [])

  useEffect(() => reset(), [reset])

  const flipDeck = () => {
    if (deck.length === 0) {
      setDeck(waste.slice().reverse().map((c) => ({ ...c, faceUp: false })))
      setWaste([])
      return
    }
    const top = deck[deck.length - 1]
    setDeck(deck.slice(0, -1))
    setWaste([...waste, { ...top, faceUp: true }])
  }

  const sendWasteToFoundation = (i: number) => {
    const w = waste[waste.length - 1]
    if (!w || !canPlaceOnFoundation(w, foundations[i])) return
    const nf = foundations.map((x) => [...x])
    nf[i] = [...nf[i], w]
    setFoundations(nf)
    setWaste(waste.slice(0, -1))
  }

  const sendTableauToFoundation = (col: number, fi: number) => {
    const c = tableau[col]
    const top = c[c.length - 1]
    if (!top || !top.faceUp || !canPlaceOnFoundation(top, foundations[fi])) return
    const nf = foundations.map((x) => [...x])
    nf[fi] = [...nf[fi], top]
    setFoundations(nf)
    const nt = tableau.map((x) => [...x])
    nt[col] = nt[col].slice(0, -1)
    if (nt[col].length) nt[col][nt[col].length - 1].faceUp = true
    setTableau(nt)
  }

  const moveWasteToTableau = (col: number) => {
    const w = waste[waste.length - 1]
    if (!w || !canPlaceOnTableau(w, tableau[col])) return
    const nt = tableau.map((x) => [...x])
    nt[col] = [...nt[col], w]
    setTableau(nt)
    setWaste(waste.slice(0, -1))
  }

  const renderCard = (c: Card, k: string | number) => (
    <div
      key={k}
      className={`w-12 h-16 border border-black rounded-sm flex flex-col items-center justify-between p-1 ${c.faceUp ? "bg-white" : "bg-blue-800"}`}
      style={{
        background: c.faceUp
          ? "white"
          : "repeating-linear-gradient(45deg, #003090 0 4px, #0050b0 4px 8px)",
      }}
    >
      {c.faceUp && (
        <>
          <div className={`text-xs font-bold leading-none ${isRed(c.suit) ? "text-red-600" : "text-black"}`}>
            {rankStr(c.rank)}
          </div>
          <div className={`text-base ${isRed(c.suit) ? "text-red-600" : "text-black"}`}>
            {c.suit}
          </div>
          <div
            className={`text-xs font-bold leading-none rotate-180 ${isRed(c.suit) ? "text-red-600" : "text-black"}`}
          >
            {rankStr(c.rank)}
          </div>
        </>
      )}
    </div>
  )

  return (
    <div className="h-full bg-green-800 p-2 flex flex-col text-white">
      <div className="flex items-start gap-2 mb-2">
        <button
          onClick={flipDeck}
          className="w-12 h-16 border border-black rounded-sm bg-blue-900 flex items-center justify-center text-white text-xs"
          style={{
            background: deck.length
              ? "repeating-linear-gradient(45deg, #003090 0 4px, #0050b0 4px 8px)"
              : "transparent",
            borderStyle: deck.length ? "solid" : "dashed",
          }}
        >
          {deck.length ? "" : "↻"}
        </button>
        <div className="w-12 h-16 border border-dashed border-white/50 rounded-sm">
          {waste.length > 0 && renderCard(waste[waste.length - 1], "waste")}
        </div>
        <div className="flex-1" />
        {foundations.map((f, i) => (
          <button
            key={i}
            onClick={() => sendWasteToFoundation(i)}
            className="w-12 h-16 border border-dashed border-white/50 rounded-sm flex items-center justify-center text-white/40 text-2xl"
          >
            {f.length > 0 ? renderCard(f[f.length - 1], `f-${i}`) : SUITS[i]}
          </button>
        ))}
      </div>
      <div className="flex gap-2 flex-1">
        {tableau.map((col, ci) => (
          <div key={ci} className="flex flex-col items-center">
            <button
              onClick={() => moveWasteToTableau(ci)}
              className="w-12 h-2 mb-px"
              title="Mover waste aquí"
            />
            <div className="relative">
              {col.length === 0 && (
                <div className="w-12 h-16 border border-dashed border-white/30 rounded-sm" />
              )}
              {col.map((c, i) => (
                <div key={i} className="absolute" style={{ top: i * 14, left: 0 }}>
                  {renderCard(c, i)}
                </div>
              ))}
              <div style={{ height: col.length * 14 + 64 }} />
            </div>
            {col.length > 0 && col[col.length - 1].faceUp && (
              <div className="flex gap-px mt-1">
                {[0, 1, 2, 3].map((fi) => (
                  <button
                    key={fi}
                    onClick={() => sendTableauToFoundation(ci, fi)}
                    className="w-3 h-3 bg-yellow-300 border border-black text-[8px] text-black"
                    title={`Enviar a ${SUITS[fi]}`}
                  >
                    {SUITS[fi]}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-white text-xs mt-1 text-center">
        Click el mazo para girar carta. ♠♥♦♣ envía carta a fundación. Línea sobre columna coloca waste.
      </div>
    </div>
  )
}
