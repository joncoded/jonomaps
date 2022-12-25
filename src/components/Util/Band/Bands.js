import React from "react"
import Band from "./Band"

export default function Bands({ stuff }) {
  const bands = stuff.filter(post => post.type === "bands")

  bands.sort((a, b) => (b.metadata.severity.key > a.metadata.severity.key ? 1 : -1))

  return (
    <div className="bands bg-black text-white w-screen sticky z-100">
      {bands.map((band, index) => (
        <Band key={`band-${index}`} data={band} />
      ))}
    </div>
  )
}
