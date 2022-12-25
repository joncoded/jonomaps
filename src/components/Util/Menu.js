import React from "react"
import { NavLink } from "react-router-dom"

const linkStyles = {
  basic: "text-green-600 md:text-green-500 hover:bg-white hover:underline hover:text-black dark:text-white dark:hover:bg-white dark:hover:text-black mx-1 p-1",
  active: "bg-white dark:bg-white text-black md:text-black dark:text-gray-800",
  toggle: "dark-toggle text-white bg-gray-800 hover:bg-white hover:text-black mx-2 p-2 whitespace-nowrap"
}

export default function Menu({ links, theme, clickDark, id, handleSearch, toggleMenu }) {
  return (
    <ul className="flex flex-col flex-wrap leading-8 md:flex-row md:leading-10 justify-center md:justify-end text-lg font-bold">
      <li key="nav-home">
        <NavLink exact onClick={toggleMenu} className={linkStyles.basic} activeClassName={linkStyles.active} to="/" title="go to home page">
          home
        </NavLink>
      </li>
      {links &&
        links.map((link, idx) => (
          <li className={link === "" ? "hidden" : ""} key={`nav-${id}-${idx}`}>
            <NavLink onClick={toggleMenu} className={linkStyles.basic} activeClassName={linkStyles.active} to={`/${link}`}>
              {link}
            </NavLink>
          </li>
        ))}
      <li key="nav-theme" className="mt-3 md:mt-0">
        <NavLink className={linkStyles.toggle} activeClassName="" to="#" onClick={clickDark}>
          {theme}
        </NavLink>
      </li>
      <li key="nav-search" className="mt-3 md:mt-0 hidden md:inline">
        
          <button onClick={handleSearch} className="menu-search ml-3">
            <span role="img" aria-label="">🔍</span> search
          </button>
        
      </li>
    </ul>
  )
}
