import React from 'react'

export default function Skip() {

    function onClick() {
      document.getElementById('main').focus()
    }

    return (
      <a onClick={onClick} className="skip custom-font-heading bg-white text-center" href="#main" style={{"zIndex": "100000"}}>
        skip to content
      </a>
    )

}