"use client"

import { useState, useEffect, useCallback } from "react"
import {
  type Card,
  canPlaceOnFoundation,
  canPlaceOnTableau,
  dealKlondike,
  isRed,
  makeShuffledDeck,
  rankStr,
  SUITS,
} from "@/modules/win95/lib/cards"

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

  const moveWasteToColumn = (col: number) => {
    const w = waste[waste.length - 1]
    if (!w || !canPlaceOnTableau(w, tableau[col])) return
    const nt = tableau.map((x) => [...x])
    nt[col] = [...nt[col], w]
    setTableau(nt)
    setWaste(waste.slice(0, -1))
  }

  return (
    <div
      className="h-full p-2 flex flex-col"
      style={{ background: "#008000", fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
    >
      <div className="flex items-start gap-2 mb-2">
        <button
          onClick={flipDeck}
          className="w-12 h-16 rounded-sm flex items-center justify-center text-white text-base"
          style={{
            background: deck.length
              ? "repeating-linear-gradient(45deg, #002060 0 4px, #1f3f8a 4px 8px)"
              : "transparent",
            border: deck.length ? "1px solid #000" : "1px dashed rgba(255,255,255,0.5)",
            boxShadow: deck.length ? "1px 1px 0 0 #000" : undefined,
          }}
        >
          {deck.length ? "" : "↻"}
        </button>
        <div className="w-12 h-16 rounded-sm" style={{ border: "1px dashed rgba(255,255,255,0.5)" }}>
          {waste.length > 0 && <CardView card={waste[waste.length - 1]} />}
        </div>
        <div className="flex-1" />
        {foundations.map((f, i) => (
          <button
            key={i}
            onClick={() => sendWasteToFoundation(i)}
            className="w-12 h-16 rounded-sm flex items-center justify-center text-white/40 text-2xl"
            style={{ border: "1px dashed rgba(255,255,255,0.5)" }}
          >
            {f.length > 0 ? <CardView card={f[f.length - 1]} /> : SUITS[i]}
          </button>
        ))}
      </div>
      <div className="flex gap-2 flex-1">
        {tableau.map((col, ci) => (
          <ColumnView
            key={ci}
            col={col}
            onClickHeader={() => moveWasteToColumn(ci)}
            onSendToFoundation={(fi) => sendTableauToFoundation(ci, fi)}
          />
        ))}
      </div>
      <div className="text-white text-[11px] mt-1 text-center opacity-90">
        Click el mazo para girar carta · ♠♥♦♣ envía a fundación · click en línea de columna para colocar carta del waste
      </div>
    </div>
  )
}

function CardView({ card }: { card: Card }) {
  const red = isRed(card.suit)
  return (
    <div
      className="w-12 h-16 rounded-sm flex flex-col items-center justify-between p-1 bg-white"
      style={{
        border: "1px solid #000",
        boxShadow: "1px 1px 0 0 #000",
        background: card.faceUp ? "white" : "repeating-linear-gradient(45deg, #002060 0 4px, #1f3f8a 4px 8px)",
      }}
    >
      {card.faceUp && (
        <>
          <div className={`text-[11px] font-bold leading-none ${red ? "text-red-600" : "text-black"}`}>
            {rankStr(card.rank)}
          </div>
          <div className={`text-base ${red ? "text-red-600" : "text-black"}`}>{card.suit}</div>
          <div className={`text-[11px] font-bold leading-none rotate-180 ${red ? "text-red-600" : "text-black"}`}>
            {rankStr(card.rank)}
          </div>
        </>
      )}
    </div>
  )
}

function ColumnView({
  col,
  onClickHeader,
  onSendToFoundation,
}: {
  col: Card[]
  onClickHeader: () => void
  onSendToFoundation: (fi: number) => void
}) {
  return (
    <div className="flex flex-col items-center">
      <button onClick={onClickHeader} className="w-12 h-3" title="Mover carta del waste aquí" />
      <div className="relative">
        {col.length === 0 && (
          <div className="w-12 h-16 rounded-sm" style={{ border: "1px dashed rgba(255,255,255,0.3)" }} />
        )}
        {col.map((c, i) => (
          <div key={i} className="absolute" style={{ top: i * 14, left: 0 }}>
            <CardView card={c} />
          </div>
        ))}
        <div style={{ height: col.length * 14 + 64 }} />
      </div>
      {col.length > 0 && col[col.length - 1].faceUp && (
        <div className="flex gap-px mt-1">
          {([0, 1, 2, 3] as const).map((fi) => (
            <button
              key={fi}
              onClick={() => onSendToFoundation(fi)}
              className="w-3 h-3 bg-yellow-200 border border-black text-[8px] flex items-center justify-center"
              title={`Enviar a ${SUITS[fi]}`}
            >
              {SUITS[fi]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

