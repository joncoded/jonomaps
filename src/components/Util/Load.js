import React, { useEffect } from "react"

export default function Load() {

  useEffect(() => {
    setTimeout(() => document.title = "⏳", 500)
  }, [])

  return (
    <main id="main" className="w-screen pb-6">
      <div className="max-w-screen-lg mx-auto my-0">
        <h2 className="text-3xl tight">
          Loading...{" "}
          <span role="img" aria-label="">
            ⏳
          </span>
        </h2>        
      </div>
    </main>
  )
}
