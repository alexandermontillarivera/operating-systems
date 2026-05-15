export type Suit = "♠" | "♥" | "♦" | "♣"

export interface Card {
  suit: Suit
  rank: number // 1-13
  faceUp: boolean
}

export const SUITS: Suit[] = ["♠", "♥", "♦", "♣"]

export const isRed = (suit: Suit) => suit === "♥" || suit === "♦"

export const rankStr = (r: number) =>
  r === 1 ? "A" : r === 11 ? "J" : r === 12 ? "Q" : r === 13 ? "K" : String(r)

export function makeShuffledDeck(): Card[] {
  const deck: Card[] = []
  for (const suit of SUITS) {
    for (let r = 1; r <= 13; r++) deck.push({ suit, rank: r, faceUp: false })
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

export function dealKlondike(deck: Card[]): { tableau: Card[][]; remainder: Card[] } {
  const tableau: Card[][] = Array.from({ length: 7 }, () => [])
  let idx = 0
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row <= col; row++) {
      const c = deck[idx++]
      c.faceUp = row === col
      tableau[col].push(c)
    }
  }
  return { tableau, remainder: deck.slice(idx) }
}

export function canPlaceOnFoundation(card: Card, foundation: Card[]): boolean {
  if (foundation.length === 0) return card.rank === 1
  const top = foundation[foundation.length - 1]
  return top.suit === card.suit && card.rank === top.rank + 1
}

export function canPlaceOnTableau(card: Card, column: Card[]): boolean {
  if (column.length === 0) return card.rank === 13
  const top = column[column.length - 1]
  return top.faceUp && top.rank === card.rank + 1 && isRed(top.suit) !== isRed(card.suit)
}
