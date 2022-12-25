import React from 'react'

export default function Titleist({section, subsection}) {

  return (

    <div className="page-title">
      <h2 className="text-3xl md:text-2xl lg:text-4xl font-bold text-center sm:text-left mb-6 sm:mb-0">
        {section} 
        {subsection && <><br className="sm:hidden" /> <span className="text-xs font-normal">({subsection})</span></>}
      </h2>
    </div> 
    

  )

}