/** Tiny BASIC interpreter — runs the user's PRINT/LET/REM/END program. */
export function runBasic(program: Map<number, string>): string[] {
  const out: string[] = []
  const vars = new Map<string, number>()
  const lines = [...program.keys()].sort((a, b) => a - b)
  for (const ln of lines) {
    const stmt = program.get(ln)!.trim()
    const upper = stmt.toUpperCase()
    if (upper.startsWith("PRINT")) {
      const rest = stmt.slice(5).trim()
      if (rest.startsWith('"') && rest.endsWith('"')) {
        out.push(rest.slice(1, -1).toUpperCase())
      } else if (rest === "") {
        out.push("")
      } else {
        const m = rest.match(/^([A-Z])$/i)
        if (m) out.push(String(vars.get(m[1].toUpperCase()) ?? 0))
        else out.push(rest.toUpperCase())
      }
    } else if (upper.startsWith("LET ") || /^[A-Z]\s*=/.test(upper)) {
      const eq = stmt.indexOf("=")
      if (eq > 0) {
        const lhs = stmt.slice(0, eq).replace(/^LET\s+/i, "").trim().toUpperCase()
        const rhs = stmt.slice(eq + 1).trim()
        const num = parseFloat(rhs)
        vars.set(lhs, isNaN(num) ? 0 : num)
      }
    } else if (upper === "END") {
      break
    } else if (upper === "REM" || upper.startsWith("REM ")) {
      // skip comment
    }
  }
  return out
}
