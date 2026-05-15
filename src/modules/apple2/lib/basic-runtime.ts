import type { BasicProgram, Mode } from "@/modules/apple2/types"

interface BasicCallbacks {
  setMode: (m: Mode) => void
  clearLores: () => void
  clearHires: () => void
  plotLores: (x: number, y: number, c: number) => void
  hlinLores: (x1: number, x2: number, y: number, c: number) => void
  vlinLores: (y1: number, y2: number, x: number, c: number) => void
  hplotLine: (x1: number, y1: number, x2: number, y2: number, c: number) => void
  clearScreen: () => void
}

interface RunOptions {
  initialColor: number
  initialHColor: number
}

/**
 * Tiny Applesoft-BASIC runtime.
 * Supports PRINT, LET, FOR/NEXT, GOTO, IF/THEN, REM, END, GR, HGR, TEXT,
 * COLOR=, HCOLOR=, PLOT, HLIN, VLIN, HPLOT (point and line), HOME.
 */
export function runProgram(
  prog: BasicProgram,
  callbacks: BasicCallbacks,
  opts: RunOptions,
): string[] {
  const out: string[] = []
  const vars = new Map<string, number>()
  const sortedLines = [...prog.lines.keys()].sort((a, b) => a - b)
  let curColor = opts.initialColor
  let curHColor = opts.initialHColor

  const evalExpr = (expr: string): number => {
    const e = expr.trim()
    if (/^\d+(\.\d+)?$/.test(e)) return parseFloat(e)
    if (/^[A-Z]$/i.test(e)) return vars.get(e.toUpperCase()) ?? 0
    try {
      const replaced = e.replace(/[A-Z]/gi, (m) => String(vars.get(m.toUpperCase()) ?? 0))
      if (/^[\d+\-*/().\s]+$/.test(replaced)) {
        // eslint-disable-next-line no-new-func
        return Function(`"use strict";return (${replaced})`)() as number
      }
    } catch {}
    return 0
  }

  const forStack: { v: string; end: number; step: number; ret: number }[] = []
  let i = 0
  let safety = 5000

  while (i < sortedLines.length && safety-- > 0) {
    const ln = sortedLines[i]
    const stmt = prog.lines.get(ln)!.trim()
    const upper = stmt.toUpperCase()

    if (upper === "END") break
    if (upper === "TEXT") {
      callbacks.setMode("text")
      i++
      continue
    }
    if (upper === "GR") {
      callbacks.setMode("lores")
      callbacks.clearLores()
      i++
      continue
    }
    if (upper === "HGR") {
      callbacks.setMode("hires")
      callbacks.clearHires()
      i++
      continue
    }
    if (upper === "HOME") {
      callbacks.clearScreen()
      i++
      continue
    }
    if (upper.startsWith("REM")) {
      i++
      continue
    }
    if (upper.startsWith("PRINT")) {
      const rest = stmt.slice(5).trim()
      if (rest === "") out.push("")
      else if (rest.startsWith('"')) {
        const end = rest.indexOf('"', 1)
        const lit = rest.slice(1, end)
        const after = rest.slice(end + 1).trim()
        let line = lit
        if (after.startsWith(";")) {
          line += String(evalExpr(after.slice(1).trim()))
        }
        out.push(line)
      } else out.push(String(evalExpr(rest)))
      i++
      continue
    }
    const letM = upper.match(/^(?:LET\s+)?([A-Z])\s*=\s*(.+)$/)
    if (letM) {
      vars.set(letM[1], evalExpr(letM[2]))
      i++
      continue
    }
    const colorM = upper.match(/^COLOR\s*=\s*(.+)$/)
    if (colorM) {
      curColor = evalExpr(colorM[1]) & 15
      i++
      continue
    }
    const hcolorM = upper.match(/^HCOLOR\s*=\s*(.+)$/)
    if (hcolorM) {
      curHColor = Math.max(0, Math.min(5, evalExpr(hcolorM[1])))
      i++
      continue
    }
    const plotM = upper.match(/^PLOT\s+(.+?)\s*,\s*(.+)$/)
    if (plotM) {
      callbacks.plotLores(evalExpr(plotM[1]), evalExpr(plotM[2]), curColor)
      i++
      continue
    }
    const hlinM = upper.match(/^HLIN\s+(.+?)\s*,\s*(.+?)\s+AT\s+(.+)$/)
    if (hlinM) {
      callbacks.hlinLores(evalExpr(hlinM[1]), evalExpr(hlinM[2]), evalExpr(hlinM[3]), curColor)
      i++
      continue
    }
    const vlinM = upper.match(/^VLIN\s+(.+?)\s*,\s*(.+?)\s+AT\s+(.+)$/)
    if (vlinM) {
      callbacks.vlinLores(evalExpr(vlinM[1]), evalExpr(vlinM[2]), evalExpr(vlinM[3]), curColor)
      i++
      continue
    }
    const hplotToM = upper.match(/^HPLOT\s+(.+?)\s*,\s*(.+?)\s+TO\s+(.+?)\s*,\s*(.+)$/)
    if (hplotToM) {
      callbacks.hplotLine(
        evalExpr(hplotToM[1]),
        evalExpr(hplotToM[2]),
        evalExpr(hplotToM[3]),
        evalExpr(hplotToM[4]),
        curHColor,
      )
      i++
      continue
    }
    const hplotM = upper.match(/^HPLOT\s+(.+?)\s*,\s*(.+)$/)
    if (hplotM) {
      const x = evalExpr(hplotM[1])
      const y = evalExpr(hplotM[2])
      callbacks.hplotLine(x, y, x, y, curHColor)
      i++
      continue
    }
    const forM = upper.match(/^FOR\s+([A-Z])\s*=\s*(.+?)\s+TO\s+(.+?)(?:\s+STEP\s+(.+))?$/)
    if (forM) {
      const v = forM[1]
      const start = evalExpr(forM[2])
      const end = evalExpr(forM[3])
      const step = forM[4] ? evalExpr(forM[4]) : 1
      vars.set(v, start)
      forStack.push({ v, end, step, ret: i })
      i++
      continue
    }
    if (/^NEXT(?:\s+[A-Z])?$/.test(upper)) {
      const top = forStack[forStack.length - 1]
      if (!top) {
        out.push("?NEXT WITHOUT FOR")
        break
      }
      const cur = (vars.get(top.v) ?? 0) + top.step
      vars.set(top.v, cur)
      if ((top.step > 0 && cur <= top.end) || (top.step < 0 && cur >= top.end)) {
        i = top.ret + 1
      } else {
        forStack.pop()
        i++
      }
      continue
    }
    const gotoM = upper.match(/^GOTO\s+(\d+)$/)
    if (gotoM) {
      const target = parseInt(gotoM[1], 10)
      const idx = sortedLines.indexOf(target)
      if (idx === -1) {
        out.push("?UNDEF'D STATEMENT")
        break
      }
      i = idx
      continue
    }
    const ifM = upper.match(/^IF\s+(.+?)\s+THEN\s+(.+)$/)
    if (ifM) {
      const condStr = ifM[1].replace(/=/g, "==")
      let condResult = false
      try {
        const replaced = condStr.replace(/[A-Z]/gi, (m) => String(vars.get(m.toUpperCase()) ?? 0))
        // eslint-disable-next-line no-new-func
        condResult = !!Function(`"use strict";return (${replaced})`)()
      } catch {}
      if (condResult) {
        const action = ifM[2].trim()
        const gM = action.match(/^GOTO\s+(\d+)$/)
        if (gM) {
          const idx = sortedLines.indexOf(parseInt(gM[1], 10))
          if (idx !== -1) {
            i = idx
            continue
          }
        }
      }
      i++
      continue
    }

    out.push("?SYNTAX ERROR")
    break
  }
  return out
}
