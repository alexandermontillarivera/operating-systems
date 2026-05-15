"use client"

import { useEffect, useRef, useState } from "react"

interface Line {
  text: string
}

const COMMANDS: Record<string, string[]> = {
  help: [
    "GNU bash, version 5.2.21(1)-release",
    "",
    "Common: ls cd pwd cat echo whoami uname apt sudo neofetch",
    "        history clear exit",
  ],
  pwd: ["/home/user"],
  whoami: ["user"],
  "uname-a": ["Linux ubuntu 6.8.0-31-generic #31-Ubuntu SMP x86_64 GNU/Linux"],
  history: [
    "Linux was created by Linus Torvalds in 1991 as a hobby project.",
    'His message: "I\'m doing a (free) operating system (just a hobby)..."',
    "",
    "Today Linux runs on:",
    "  - 96% of top web servers",
    "  - 100% of top 500 supercomputers",
    "  - 3+ billion Android devices",
    "  - The International Space Station",
  ],
  neofetch: [
    "[31m             .-/+oossssoo+/-.[0m               [32muser[0m@[32mubuntu[0m",
    "[31m         `:+ssssssssssssssssss+:`[0m           ----------------",
    "[31m       -+ssssssssssssssssssyyssss+-[0m         [32mOS:[0m Ubuntu 24.04 LTS",
    "[31m     .ossssssssssssssssssdMMMNysssso.[0m       [32mKernel:[0m 6.8.0-31-generic",
    "[31m    /ssssssssssshdmmNNmmyNMMMMhssssss/[0m      [32mUptime:[0m 2 hours",
    "[31m   +ssssssssshmydMMMMMMMNddddyssssssss+[0m     [32mPackages:[0m 2847 (apt)",
    "[31m  /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/[0m    [32mShell:[0m bash 5.2.21",
    "[31m .ssssssssdMMMNhsssssssssshNMMMdssssssss.[0m   [32mDE:[0m GNOME 46",
    "[31m +sssshhhyNMMNyssssssssssssyNMMMysssssss+[0m   [32mWM:[0m Mutter",
    "[31m ossyNMMMNyMMhsssssssssssssshmmmhssssssso[0m   [32mTerminal:[0m gnome-terminal",
    "[31m  /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/[0m    [32mCPU:[0m Intel i7 (8) @ 3.6GHz",
    "[31m   +sssssssssdmydMMMMMMMMddddyssssssss+[0m     [32mMemory:[0m 3847 / 16384 MiB",
    "",
  ],
}

function renderAnsi(line: string): React.ReactNode {
  const parts = line.split(/\[(\d+)m/)
  let cur = "text-gray-200"
  return parts.map((p, i) => {
    if (i % 2 === 1) {
      switch (p) {
        case "31":
          cur = "text-red-400"
          break
        case "32":
          cur = "text-green-400"
          break
        case "33":
          cur = "text-yellow-400"
          break
        case "34":
          cur = "text-blue-400"
          break
        case "35":
          cur = "text-purple-400"
          break
        case "36":
          cur = "text-cyan-400"
          break
        case "0":
          cur = "text-gray-200"
          break
      }
      return null
    }
    return (
      <span key={i} className={cur}>
        {p}
      </span>
    )
  })
}

export function Terminal() {
  const [input, setInput] = useState("")
  const [lines, setLines] = useState<Line[]>([
    { text: "Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-31-generic x86_64)" },
    { text: "" },
    { text: " * Documentation:  https://help.ubuntu.com" },
    { text: "" },
    { text: `Last login: ${new Date().toLocaleString()} from 192.168.1.1` },
    { text: "" },
  ])
  const [cwd, setCwd] = useState("~")
  const ref = useRef<HTMLDivElement>(null)
  const inp = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [lines])
  useEffect(() => inp.current?.focus(), [])

  const exec = (cmd: string) => {
    const t = cmd.trim()
    setLines((p) => [...p, { text: `​user@ubuntu:${cwd}$ ${t}` }])
    if (!t) return
    const [c, ...args] = t.split(" ")
    let out: string[] = []

    switch (c) {
      case "help":
        out = COMMANDS.help
        break
      case "ls":
        if (args.includes("-la") || args.includes("-l"))
          out = [
            "total 48",
            "drwxr-xr-x  8 user user 4096 May  9 10:30 .",
            "drwxr-xr-x  3 root root 4096 May  9 08:00 ..",
            "-rw-------  1 user user  220 May  9 08:00 .bash_history",
            "-rw-r--r--  1 user user 3771 May  9 08:00 .bashrc",
            "drwxr-xr-x  2 user user 4096 May  9 09:00 Desktop",
            "drwxr-xr-x  2 user user 4096 May  9 09:00 Documents",
          ]
        else out = ["[34mDesktop[0m  [34mDocuments[0m  [34mDownloads[0m  [34mPictures[0m"]
        break
      case "cd":
        if (!args[0] || args[0] === "~") setCwd("~")
        else if (args[0] === "..") setCwd("~")
        else if (["Desktop", "Documents", "Downloads", "Pictures", "Music", "Videos"].includes(args[0]))
          setCwd(`~/${args[0]}`)
        else out = [`bash: cd: ${args[0]}: No such file or directory`]
        break
      case "pwd":
        out = [cwd === "~" ? "/home/user" : `/home/user/${cwd.slice(2)}`]
        break
      case "whoami":
        out = COMMANDS.whoami
        break
      case "uname":
        out = args.includes("-a") ? COMMANDS["uname-a"] : ["Linux"]
        break
      case "apt":
        if (args[0] === "update")
          out = [
            "Reading package lists... Done",
            "Building dependency tree... Done",
            "All packages are up to date.",
          ]
        else if (args[0] === "install" && args[1])
          out = [
            "Reading package lists... Done",
            `The following NEW packages will be installed: ${args[1]}`,
            `Setting up ${args[1]} ... done.`,
          ]
        else out = ["apt 2.7.14 - Usage: apt [options] command"]
        break
      case "sudo":
        out = [
          "[sudo] password for user: ",
          "Sorry, user is not in the sudoers file.",
        ]
        break
      case "echo":
        out = [args.join(" ")]
        break
      case "neofetch":
        out = COMMANDS.neofetch
        break
      case "history":
        out = COMMANDS.history
        break
      case "clear":
        setLines([])
        return
      case "":
        break
      default:
        out = [`Command '${c}' not found, type 'help' for available commands.`]
    }
    setLines((p) => [...p, ...out.map((text) => ({ text }))])
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      exec(input)
      setInput("")
    }
  }

  return (
    <div
      ref={ref}
      onClick={() => inp.current?.focus()}
      className="h-full bg-[#300a24] p-3 overflow-y-auto font-mono text-sm text-gray-200 cursor-text"
    >
      {lines.map((l, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {renderAnsi(l.text)}
        </div>
      ))}
      <div className="flex">
        <span className="text-green-400">user@ubuntu</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">{cwd}</span>
        <span className="text-white">$&nbsp;</span>
        <input
          ref={inp}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          className="flex-1 bg-transparent outline-none text-gray-200 caret-gray-200"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
