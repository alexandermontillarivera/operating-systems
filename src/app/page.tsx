"use client"

import { useState } from "react"
import { OSSelector } from "@/components/os-selector"
import { UnixSimulator } from "@/modules/unix"
import { CPMSimulator } from "@/modules/cpm"
import { Apple2Simulator } from "@/modules/apple2"
import { DOSSimulator } from "@/modules/dos"
import { BSDSimulator } from "@/modules/bsd"
import { MacClassicSimulator } from "@/modules/mac-classic"
import { Win31Simulator } from "@/modules/win31"
import { Win95Simulator } from "@/modules/win95"
import { WinXPSimulator } from "@/modules/winxp"
import { Win7Simulator } from "@/modules/win7"
import { MacOSSimulator } from "@/modules/macos"
import { UbuntuSimulator as LinuxUbuntuSimulator } from "@/modules/ubuntu"
import { ArchSimulator as LinuxArchSimulator } from "@/modules/arch"

export default function Home() {
  const [selectedOS, setSelectedOS] = useState<string | null>(null)

  const handleBack = () => {
    setSelectedOS(null)
  }

  // Terminal Era
  if (selectedOS === "unix") {
    return <UnixSimulator onBack={handleBack} />
  }

  if (selectedOS === "cpm") {
    return <CPMSimulator onBack={handleBack} />
  }

  if (selectedOS === "apple2") {
    return <Apple2Simulator onBack={handleBack} />
  }

  if (selectedOS === "dos") {
    return <DOSSimulator onBack={handleBack} />
  }

  if (selectedOS === "bsd") {
    return <BSDSimulator onExit={handleBack} />
  }

  // GUI Era
  if (selectedOS === "macclassic") {
    return <MacClassicSimulator onBack={handleBack} />
  }

  if (selectedOS === "win31") {
    return <Win31Simulator onBack={handleBack} />
  }

  if (selectedOS === "win95") {
    return <Win95Simulator onBack={handleBack} />
  }

  if (selectedOS === "winxp") {
    return <WinXPSimulator onBack={handleBack} />
  }

  if (selectedOS === "win7") {
    return <Win7Simulator onBack={handleBack} />
  }

  if (selectedOS === "macos") {
    return <MacOSSimulator onBack={handleBack} />
  }

  // Linux
  if (selectedOS === "ubuntu") {
    return <LinuxUbuntuSimulator onBack={handleBack} />
  }

  if (selectedOS === "arch") {
    return <LinuxArchSimulator onBack={handleBack} />
  }

  return <OSSelector onSelect={setSelectedOS} />
}
