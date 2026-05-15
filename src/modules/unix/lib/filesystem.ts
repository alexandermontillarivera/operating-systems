import type { FsNode } from "@/modules/unix/types"

export const initialFs = (): FsNode => ({
  type: "dir",
  children: {
    bin: {
      type: "dir",
      children: {
        sh: { type: "file", content: "/* Bourne shell binary */" },
        ls: { type: "file", content: "/* list directory */" },
        cat: { type: "file", content: "/* concatenate */" },
        ed: { type: "file", content: "/* line editor by Ken Thompson */" },
        grep: { type: "file", content: "/* search text */" },
        wc: { type: "file", content: "/* word count */" },
        who: { type: "file", content: "/* who is on */" },
        ps: { type: "file", content: "/* process status */" },
        mkdir: { type: "file", content: "/* make directory */" },
        rm: { type: "file", content: "/* remove */" },
        cp: { type: "file", content: "/* copy */" },
        mv: { type: "file", content: "/* move */" },
        chmod: { type: "file", content: "/* change mode */" },
      },
    },
    etc: {
      type: "dir",
      children: {
        passwd: {
          type: "file",
          content:
            "root:x:0:0:Charlie Root:/home/root:/bin/sh\nken:x:101:1:Ken Thompson:/home/ken:/bin/sh\ndmr:x:102:1:Dennis Ritchie:/home/dmr:/bin/sh\nbwk:x:103:1:Brian Kernighan:/home/bwk:/bin/sh",
        },
        motd: {
          type: "file",
          content:
            "Welcome to UNIX Version 7\nBell Telephone Laboratories\n* Read /etc/motd for the news of the day *",
        },
        group: {
          type: "file",
          content: "wheel:*:0:root\nstaff:*:1:ken,dmr,bwk",
        },
      },
    },
    home: {
      type: "dir",
      children: {
        root: {
          type: "dir",
          children: {
            ".profile": { type: "file", content: "PATH=/bin:/usr/bin\nexport PATH\nPS1='$ '" },
            "notes.txt": {
              type: "file",
              content:
                "Things to do:\n- Write the C compiler\n- Port to PDP-11\n- Document the system calls\n- Have lunch with Dennis",
            },
          },
        },
        ken: {
          type: "dir",
          children: {
            "unix.c": {
              type: "file",
              content:
                "/*\n * The UNIX kernel.\n * Written by Ken Thompson, 1969.\n */\nmain() {\n    /* The journey begins here */\n    return 0;\n}",
            },
          },
        },
        dmr: {
          type: "dir",
          children: {
            "hello.c": {
              type: "file",
              content: '#include <stdio.h>\n\nmain() {\n    printf("hello, world\\n");\n}',
            },
          },
        },
      },
    },
    usr: {
      type: "dir",
      children: {
        bin: { type: "dir", children: {} },
        lib: { type: "dir", children: {} },
        man: { type: "dir", children: {} },
        src: { type: "dir", children: {} },
      },
    },
    tmp: { type: "dir", children: {} },
    "readme.txt": {
      type: "file",
      content:
        "Welcome to UNIX V7.\n\nKey commands:\n  ls cd cat ed grep wc who ps mkdir cp mv rm\n  man <cmd>     - read manual\n  ed <file>     - edit a file\n  su <user>     - switch user\n  history       - show UNIX history\n",
    },
  },
})

export const splitPath = (p: string): string[] => p.split("/").filter(Boolean)

export function resolvePath(cwd: string, target: string): string {
  if (!target) return cwd
  const parts = target.startsWith("/")
    ? splitPath(target)
    : [...splitPath(cwd), ...splitPath(target)]
  const stack: string[] = []
  for (const part of parts) {
    if (part === ".") continue
    if (part === "..") stack.pop()
    else stack.push(part)
  }
  return "/" + stack.join("/")
}

export function getNode(fs: FsNode, path: string): FsNode | null {
  const parts = splitPath(path)
  let cur: FsNode = fs
  for (const p of parts) {
    if (cur.type !== "dir") return null
    const child: FsNode | undefined = cur.children[p]
    if (!child) return null
    cur = child
  }
  return cur
}

export function setFile(fs: FsNode, path: string, content: string): boolean {
  const parts = splitPath(path)
  if (parts.length === 0) return false
  const fileName = parts.pop() as string
  let cur: FsNode = fs
  for (const p of parts) {
    if (cur.type !== "dir") return false
    const child: FsNode | undefined = cur.children[p]
    if (!child) return false
    cur = child
  }
  if (cur.type !== "dir") return false
  cur.children[fileName] = { type: "file", content }
  return true
}

export function makeDir(fs: FsNode, path: string): boolean {
  const parts = splitPath(path)
  if (parts.length === 0) return false
  const dirName = parts.pop() as string
  let cur: FsNode = fs
  for (const p of parts) {
    if (cur.type !== "dir") return false
    const child: FsNode | undefined = cur.children[p]
    if (!child) return false
    cur = child
  }
  if (cur.type !== "dir" || cur.children[dirName]) return false
  cur.children[dirName] = { type: "dir", children: {} }
  return true
}

export function removeNode(fs: FsNode, path: string): boolean {
  const parts = splitPath(path)
  if (parts.length === 0) return false
  const name = parts.pop() as string
  let cur: FsNode = fs
  for (const p of parts) {
    if (cur.type !== "dir") return false
    const child: FsNode | undefined = cur.children[p]
    if (!child) return false
    cur = child
  }
  if (cur.type !== "dir" || !cur.children[name]) return false
  delete cur.children[name]
  return true
}
