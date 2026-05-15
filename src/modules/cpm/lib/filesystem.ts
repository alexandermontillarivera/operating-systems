import type { Drive } from "@/modules/cpm/types"

export type Files = Record<Drive, Record<string, string>>

export const initialFiles = (): Files => ({
  A: {
    "COMMAND.COM": "/* CCP - Console Command Processor */",
    "PIP.COM": "/* Peripheral Interchange Program */",
    "ED.COM": "/* Line editor */",
    "ASM.COM": "/* 8080 Assembler */",
    "DDT.COM": "/* Dynamic Debugging Tool */",
    "STAT.COM": "/* Status utility */",
    "MBASIC.COM": "/* Microsoft BASIC interpreter */",
    "WS.COM": "/* WordStar word processor */",
    "README.TXT":
      "WELCOME TO CP/M 2.2\n\nCP/M IS THE OPERATING SYSTEM THAT INSPIRED MS-DOS.\nIT WAS CREATED BY GARY KILDALL AT DIGITAL RESEARCH IN 1974.\n\nTRY THESE COMMANDS:\n  DIR\n  TYPE README.TXT\n  ED LETTER.TXT\n  WS\n  MBASIC\n  PIP B:=A:README.TXT\n  USER 1\n  STAT",
    "LETTER.TXT":
      "DEAR GARY,\n\nTHANK YOU FOR INVENTING CP/M.\nIT CHANGED THE WORLD OF MICROCOMPUTING.\n\nSINCERELY,\nA FAN",
    "AUTOEXEC.SUB": "DIR\nSTAT",
  },
  B: {
    "DATA.TXT":
      "CUSTOMER DATABASE\n----------------\nID  NAME             CITY\n01  ACME CORP        BOSTON\n02  WIDGET CO        SEATTLE\n03  GIZMO LTD        LONDON",
  },
})

/** Parse `B:FOO.TXT` or `FOO.TXT` references. Falls back to currentDrive when no drive prefix. */
export function parseRef(s: string, currentDrive: Drive): { d: Drive; name: string } {
  const up = s.toUpperCase()
  if (up.length >= 2 && up[1] === ":") {
    return { d: (up[0] as Drive) === "B" ? "B" : "A", name: up.slice(2) }
  }
  return { d: currentDrive, name: up }
}
