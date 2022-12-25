import React from "react"

export default function Band({ data }) {
  const { severity } = data.metadata
  let bgColor = ""

  switch (severity.value) {
    case "high":
      bgColor = "bg-red-700 dark:bg-red-900"
      break
    case "medium":
      bgColor = "bg-yellow-700 dark:bg-yellow-900"
      break
    case "low":
      bgColor = "bg-green-700 dark:bg-green-900"
      break
    default:
      bgColor = "bg-blue-700 dark:bg-blue-900"
  }

  function handleClick(e) {
    e.preventDefault()
    e.target.parentNode.classList.add('hidden')
  }

  return (
    <div className={`band ${bgColor} w-screen shadow-xl p-3 text-center relative`}>
      <button onClick={handleClick} className="absolute right-5 top-0 border-0 text-4xl" aria-label="Close">&times;</button>
      <div className="max-w-screen-xl mx-auto text-sm md:text-lg" dangerouslySetInnerHTML={{ __html: data.title }}></div>
      {data.content && <div className="max-w-screen-xl mx-auto text-sm md:text-md" dangerouslySetInnerHTML={{ __html: data.content }}></div>}      
    </div>
  )
}
