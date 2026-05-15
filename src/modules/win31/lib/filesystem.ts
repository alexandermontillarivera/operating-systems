import type { FmFile } from "@/modules/win31/types"

export const initialFm = (): FmFile => ({
  name: "C:\\",
  type: "folder",
  children: [
    {
      name: "DOS",
      type: "folder",
      children: [
        { name: "COMMAND.COM", type: "file", size: 47845 },
        { name: "FORMAT.COM", type: "file", size: 22974 },
        { name: "EDIT.COM", type: "file", size: 413 },
      ],
    },
    {
      name: "WINDOWS",
      type: "folder",
      children: [
        { name: "WIN.COM", type: "file", size: 25719 },
        { name: "PROGMAN.EXE", type: "file", size: 115048 },
        { name: "WINFILE.EXE", type: "file", size: 146384 },
        { name: "NOTEPAD.EXE", type: "file", size: 32576 },
        { name: "WRITE.EXE", type: "file", size: 165872 },
        { name: "CALC.EXE", type: "file", size: 43072 },
        { name: "PBRUSH.EXE", type: "file", size: 184464 },
        { name: "SOL.EXE", type: "file", size: 174704 },
        { name: "WINMINE.EXE", type: "file", size: 27776 },
        {
          name: "SYSTEM",
          type: "folder",
          children: [
            { name: "USER.EXE", type: "file", size: 67648 },
            { name: "GDI.EXE", type: "file", size: 220800 },
          ],
        },
      ],
    },
    {
      name: "DOCS",
      type: "folder",
      children: [
        { name: "README.TXT", type: "file", size: 256 },
        { name: "LETTER.WRI", type: "file", size: 1024 },
      ],
    },
    { name: "AUTOEXEC.BAT", type: "file", size: 128 },
    { name: "CONFIG.SYS", type: "file", size: 256 },
  ],
})
