import type { FsNode } from "@/modules/bsd/types"

export const initialFs = (): FsNode => ({
  type: "dir",
  children: {
    bin: {
      type: "dir",
      children: {
        ls: { type: "file", content: "/* ls binary */" },
        cat: { type: "file", content: "/* cat binary */" },
        cp: { type: "file", content: "/* cp binary */" },
        mv: { type: "file", content: "/* mv binary */" },
        rm: { type: "file", content: "/* rm binary */" },
        sh: { type: "file", content: "/* Bourne shell */" },
        csh: { type: "file", content: "/* C shell - by Bill Joy */" },
        vi: { type: "file", content: "/* vi - by Bill Joy */" },
        ed: { type: "file", content: "/* ed line editor */" },
        mkdir: { type: "file", content: "/* mkdir */" },
        mail: { type: "file", content: "/* mail */" },
      },
    },
    etc: {
      type: "dir",
      children: {
        passwd: {
          type: "file",
          content:
            "root:*:0:0:Charlie &:/root:/bin/csh\ndaemon:*:1:1:The devil himself:/root:\noperator:*:2:5:System &:/usr/guest/operator:/bin/csh\njoy:*:100:10:Bill Joy:/home/joy:/bin/csh\nken:*:101:10:Ken Thompson:/home/ken:/bin/sh\ndmr:*:102:10:Dennis Ritchie:/home/dmr:/bin/sh",
        },
        hosts: {
          type: "file",
          content:
            "127.0.0.1       localhost\n128.32.0.1      ucbvax.Berkeley.EDU ucbvax\n128.32.0.4      monet.Berkeley.EDU monet\n192.5.51.1      arpa.Berkeley.EDU arpa",
        },
        motd: {
          type: "file",
          content: "4.3 BSD UNIX\nUniversity of California, Berkeley\nWelcome to ucbvax.",
        },
        rc: { type: "file", content: "#!/bin/sh\n# system rc script" },
      },
    },
    home: {
      type: "dir",
      children: {
        root: {
          type: "dir",
          children: {
            ".cshrc": { type: "file", content: "set prompt='%' \nset history=50" },
            TODO: { type: "file", content: "- backup ufs\n- check uucp queue\n- fsck -a" },
          },
        },
        joy: {
          type: "dir",
          children: {
            "vi.c": {
              type: "file",
              content:
                "/* vi - the visual editor */\n/* by William N. Joy, UC Berkeley */\nmain() {\n    /* edit the world */\n    return 0;\n}",
            },
            "csh.1": {
              type: "file",
              content: "Manual page for csh - the C shell with command history",
            },
          },
        },
        ken: {
          type: "dir",
          children: {
            "regex.c": { type: "file", content: "/* The original regex implementation */" },
          },
        },
      },
    },
    usr: {
      type: "dir",
      children: {
        bin: { type: "dir", children: {} },
        man: { type: "dir", children: {} },
        src: {
          type: "dir",
          children: {
            sys: { type: "dir", children: {} },
            ucb: { type: "dir", children: {} },
          },
        },
      },
    },
    var: {
      type: "dir",
      children: {
        mail: {
          type: "dir",
          children: {
            root: {
              type: "file",
              content:
                "From joy@ucbvax Wed Apr  9 15:22 1986\nSubject: Re: 4.3BSD release\n\nThe sources are ready for distribution.\nDon't forget the new sockets API!\n\n  -- Bill\n\nFrom dmr@research Mon Apr  7 09:00 1986\nSubject: C compiler bug\n\nThere's a parsing issue in the new ANSI C draft.\nLet's discuss next week.\n\n  -- Dennis",
            },
          },
        },
      },
    },
    tmp: { type: "dir", children: {} },
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
