const PAGES: Record<string, string[]> = {
  ls: [
    "LS(1)                BSD General Commands Manual                LS(1)",
    "",
    "NAME      ls - list directory contents",
    "SYNOPSIS  ls [-aClFR] [file ...]",
    "DESCRIPTION  Lists directory contents.",
    "",
    "HISTORY   An ls command appeared in Version 1 AT&T UNIX.",
  ],
  vi: [
    "VI(1)                BSD General Commands Manual                VI(1)",
    "",
    "NAME      vi - screen oriented (visual) display editor based on ex",
    "SYNOPSIS  vi [file]",
    "DESCRIPTION",
    "  Vi (visual) is a display oriented text editor based on ex.",
    "  Modes:  normal | insert | command (:)",
    "  Move:   h j k l (or arrows)   0 $   G",
    "  Insert: i a o   <Esc> to leave",
    "  Delete: x  d (line)",
    "  :w :q :wq :q!  for save / quit",
    "",
    "HISTORY  vi appeared in 3.0BSD. Bill Joy wrote vi at UC Berkeley in 1976.",
  ],
  csh: [
    "CSH(1)               BSD General Commands Manual               CSH(1)",
    "",
    "NAME      csh - a shell with C-like syntax",
    "DESCRIPTION",
    "  csh is a command language interpreter by Bill Joy at UC Berkeley.",
    "  Features: command history, aliases, job control, C-like scripting.",
    "",
    "HISTORY  csh appeared in 2BSD.",
  ],
  socket: [
    "SOCKET(2)            BSD System Calls Manual                SOCKET(2)",
    "",
    "NAME      socket - create an endpoint for communication",
    "SYNOPSIS  s = socket(domain, type, protocol)",
    "",
    "HISTORY   The socket function call appeared in 4.2BSD (1983).",
    "          It is the foundation of network programming.",
  ],
  sh: [
    "SH(1)                BSD General Commands Manual                SH(1)",
    "",
    "NAME      sh - the Bourne shell",
    "AUTHOR    Stephen R. Bourne, Bell Labs.",
  ],
  ed: [
    "ED(1)                BSD General Commands Manual                ED(1)",
    "",
    "NAME      ed - line oriented editor",
    "AUTHOR    Ken Thompson",
  ],
  mail: [
    "MAIL(1)              BSD General Commands Manual              MAIL(1)",
    "",
    "NAME      mail - send and receive mail",
    "USAGE     mail [user]",
  ],
}

export function manPage(cmd: string): string[] {
  return PAGES[cmd] || [`No manual entry for ${cmd}`]
}
