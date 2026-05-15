"use client"

import Image from "next/image"

/**
 * Bliss wallpaper — uses public/winxp-bliss.jpg as background.
 */
export function BlissWallpaper() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#7cc7e6]">
      <Image
        src="/winxp-bliss.jpg"
        alt="Bliss"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  )
}
