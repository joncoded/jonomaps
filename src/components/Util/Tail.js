import React from "react"

export default function Tail({ site }) {
  const { copyright, social } = site.metadata

  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-white w-full shadow-xl z-50">
      <div className="flex flex-col md:flex-row place-content-between items-center max-w-screen-lg mx-auto my-0">
        <div className="text-sm md:text-lg text-center md:text-left" dangerouslySetInnerHTML={{ __html: copyright }}></div>
        <div className="text-sm md:text-md text-center my-3 md:my-0 md:text-right" dangerouslySetInnerHTML={{ __html: social }}></div>
      </div>
    </footer>
  )
}
