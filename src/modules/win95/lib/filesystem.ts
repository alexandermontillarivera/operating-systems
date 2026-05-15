import type { Win95File } from "@/modules/win95/types"

export const makeWin95Fs = (): Win95File => ({
  name: "C:",
  type: "folder",
  children: [
    {
      name: "Windows",
      type: "folder",
      children: [
        { name: "win.com", type: "file", ext: "com", size: 25000 },
        { name: "explorer.exe", type: "file", ext: "exe", size: 240000 },
        { name: "notepad.exe", type: "file", ext: "exe", size: 35000 },
        { name: "calc.exe", type: "file", ext: "exe", size: 90000 },
        { name: "winmine.exe", type: "file", ext: "exe", size: 28000 },
        { name: "sol.exe", type: "file", ext: "exe", size: 178000 },
        { name: "mspaint.exe", type: "file", ext: "exe", size: 320000 },
        {
          name: "System",
          type: "folder",
          children: [
            { name: "kernel32.dll", type: "file", ext: "dll", size: 412000 },
            { name: "user32.dll", type: "file", ext: "dll", size: 290000 },
            { name: "gdi32.dll", type: "file", ext: "dll", size: 187000 },
          ],
        },
      ],
    },
    {
      name: "Mis Documentos",
      type: "folder",
      children: [
        {
          name: "Bienvenida.txt",
          type: "file",
          ext: "txt",
          size: 256,
          content:
            "¡Bienvenido a Windows 95!\n\nLanzamiento: 24 de agosto de 1995\nCódigo: Chicago\n\nNovedades:\n- Botón Inicio y barra de tareas\n- Mi PC y Explorador\n- Plug and Play\n- Nombres largos de archivo\n- 32-bit preemptive multitasking",
        },
        {
          name: "Carta.rtf",
          type: "file",
          ext: "rtf",
          size: 512,
          content:
            "Este es un documento de Wordpad.\n\nWordpad reemplazó a Microsoft Write y soporta:\n- Texto enriquecido (RTF)\n- Negrita, cursiva, subrayado\n- Diferentes fuentes y tamaños",
        },
      ],
    },
    {
      name: "Archivos de programa",
      type: "folder",
      children: [
        {
          name: "Accesorios",
          type: "folder",
          children: [{ name: "wordpad.exe", type: "file", ext: "exe", size: 220000 }],
        },
      ],
    },
    {
      name: "autoexec.bat",
      type: "file",
      ext: "bat",
      size: 128,
      content: "@echo off\nPATH C:\\WINDOWS;C:\\DOS\nwin",
    },
    { name: "config.sys", type: "file", ext: "sys", size: 256 },
  ],
})

export function navigate(root: Win95File, parts: string[]): Win95File | null {
  if (parts.length === 0 || parts[0] !== root.name) return null
  let cur: Win95File = root
  for (let i = 1; i < parts.length; i++) {
    if (cur.type !== "folder" || !cur.children) return null
    const child = cur.children.find((c) => c.name === parts[i])
    if (!child) return null
    cur = child
  }
  return cur
}

export function fileIcon(file: Win95File): "folder" | "exe" | "txt" | "doc" | "system" {
  if (file.type === "folder") return "folder"
  if (file.ext === "exe") return "exe"
  if (file.ext === "txt" || file.ext === "bat") return "txt"
  if (file.ext === "rtf" || file.ext === "doc") return "doc"
  return "system"
}
