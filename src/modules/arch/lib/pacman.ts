interface Line {
  text: string
  cls?: string
}

/** Format pacman output (with ANSI-ish color classes) for the terminal. */
export function pacmanCommand(args: string[]): Line[] {
  const sub = args[0]

  if (sub === "-Syu" || sub === "-Syyu") {
    return [
      { text: ":: Synchronizing package databases...", cls: "text-[#1793D1]" },
      { text: " core                          187.4 KiB   1.2 MiB/s 00:00 [######] 100%", cls: "text-green-400" },
      { text: " extra                        2003.5 KiB   8.4 MiB/s 00:00 [######] 100%", cls: "text-green-400" },
      { text: " multilib                      164.3 KiB   2.1 MiB/s 00:00 [######] 100%", cls: "text-green-400" },
      { text: ":: Starting full system upgrade...", cls: "text-[#1793D1]" },
      { text: " there is nothing to do", cls: "text-gray-400" },
    ]
  }

  if (sub === "-Ss" && args[1]) {
    const p = args[1]
    return [
      { text: `extra/${p} 1.2.3-1`, cls: "text-purple-400" },
      { text: `    Description for ${p}`, cls: "text-gray-400" },
      { text: `community/${p}-git r123.abcd-1`, cls: "text-purple-400" },
      { text: `    Development version of ${p}`, cls: "text-gray-400" },
    ]
  }

  if (sub === "-S" && args[1]) {
    const p = args[1]
    return [
      { text: "resolving dependencies...", cls: "text-gray-400" },
      { text: "looking for conflicting packages...", cls: "text-gray-400" },
      { text: "" },
      { text: `Packages (1) ${p}-1.2.3-1`, cls: "text-[#1793D1]" },
      { text: "Total Download Size:   2.34 MiB" },
      { text: "Total Installed Size:  9.87 MiB" },
      { text: "" },
      { text: ":: Proceed with installation? [Y/n] y", cls: "text-[#1793D1]" },
      { text: ":: Retrieving packages...", cls: "text-[#1793D1]" },
      { text: ` ${p}-1.2.3-1-x86_64        2.3 MiB  4.5 MiB/s 00:01 [######] 100%`, cls: "text-green-400" },
      { text: "(1/1) checking keys in keyring                  [######] 100%", cls: "text-gray-400" },
      { text: "(1/1) checking package integrity                [######] 100%", cls: "text-gray-400" },
      { text: "(1/1) loading package files                     [######] 100%", cls: "text-gray-400" },
      { text: "(1/1) checking for file conflicts               [######] 100%", cls: "text-gray-400" },
      { text: ":: Processing package changes...", cls: "text-[#1793D1]" },
      { text: `(1/1) installing ${p}                            [######] 100%`, cls: "text-green-400" },
      { text: ":: Running post-transaction hooks...", cls: "text-[#1793D1]" },
    ]
  }

  if (sub === "-Q") {
    return [
      { text: "alacritty 0.13.2-1" },
      { text: "base 3-2" },
      { text: "bash 5.2.026-1" },
      { text: "firefox 126.0-1" },
      { text: "i3-wm 4.23-1" },
      { text: "linux 6.9.1.arch1-1" },
      { text: "neofetch 7.1.0-2" },
      { text: "pacman 6.1.0-3" },
      { text: "vim 9.1.0-1" },
      { text: "zsh 5.9-7" },
      { text: "... and 837 more", cls: "text-gray-500" },
    ]
  }

  if (sub === "-R" && args[1]) {
    return [
      { text: "checking dependencies...", cls: "text-gray-400" },
      { text: "" },
      { text: `Packages (1) ${args[1]}-1.2.3-1`, cls: "text-red-400" },
      { text: "" },
      { text: ":: Do you want to remove these packages? [Y/n] y", cls: "text-[#1793D1]" },
      { text: `(1/1) removing ${args[1]}                          [######] 100%`, cls: "text-red-400" },
    ]
  }

  return [
    { text: "usage:  pacman <operation> [...]" },
    { text: "" },
    { text: "operations:" },
    { text: "    -S, --sync        synchronize packages" },
    { text: "    -Q, --query       query the package database" },
    { text: "    -R, --remove      remove packages" },
    { text: "    -U, --upgrade     upgrade packages" },
    { text: "" },
    { text: "Pacman — fast, dependency-resolving package manager." },
  ]
}

export function yayCommand(args: string[]): Line[] {
  if (args[0] === "-Ss" && args[1]) {
    return [
      { text: `aur/${args[1]}-bin 1.2.3-1 (+254 5.32)`, cls: "text-purple-400" },
      { text: `    ${args[1]} - precompiled binary from AUR`, cls: "text-gray-400" },
      { text: `aur/${args[1]}-git r45.abcdef-1 (+89 4.78)`, cls: "text-purple-400" },
      { text: `    ${args[1]} - latest git version`, cls: "text-gray-400" },
    ]
  }
  return [
    { text: "yay v12.3.4 - AUR helper" },
    { text: "Usage: yay [operation] [...]" },
    { text: "  -Ss <pkg>   search AUR" },
    { text: "  -S <pkg>    install from AUR" },
    { text: "  -Syu        full system upgrade including AUR" },
  ]
}
