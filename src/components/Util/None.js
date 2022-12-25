import React from "react"

export default function None() {
  document.title = "404"

  return (
    <main id="main" className="w-screen pb-6">
      <div className="max-w-screen-lg mx-auto my-0">
        <h2 className="text-6xl">
          404{" "}
          <span role="img" aria-label="">
            🐼🤷‍♂️
          </span>{" "}
        </h2>
      </div>
    </main>
  )
}
