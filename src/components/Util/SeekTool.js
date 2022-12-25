import React from "react"

export default function SeekTool({ seekResults, setResults, relevant }) {
  return (
    <div className="page-seek mb-12 text-center sm:text-right">
      <label className="sr-only" htmlFor="seek-input">filter</label>
      <input id="seek-input" className="border-2 dark:bg-black dark:text-white" type="text" onChange={e => seekResults(e.target.value, setResults, relevant)} placeholder="filter"></input>
    </div>
  )
}
