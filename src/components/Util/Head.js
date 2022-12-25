import React from "react"
import { NavLink } from "react-router-dom"
import { clickDark, loadDark } from "./Dark"
import Find from "./Find"
import Menu from "./Menu"
import Bands from "./Band/Bands"

export default function Head({ site, stuff, handleSearch }) {
  let theme = loadDark()
  const { name, tagline } = site.metadata
  const links = Object.values(site.metadata.section_labels)

  function toggleMenu() {
    const mobiler = document.querySelector(".menu-mobile")
    mobiler.classList.toggle("hidden")
  }

  return (
    <header className="sticky top-0 w-screen z-50">

      <Find site={site} stuff={stuff} />    
    
      <nav className="bg-black text-white dark:bg-gray-800 dark:text-white shadow-xl">
        <div className="max-w-screen-lg mx-auto my-0">

          <div className="site-head flex flex-cols md:flex-row justify-between items-center">
        
            <div className="site-head-name mx-0 flex items-center">
              <h1 className="text-lg md:text-2xl font-extrabold">                
                <NavLink to="/" title="go to home page" className="flex" exact>
                  <img src="/icons/favicon-32x32.png" alt="" /> 
                  <div className="ml-3">{name}</div>                  
                </NavLink>                                
              </h1>
              <div className="text-sm hidden lg:inline font-semibold ml-3">({tagline})</div>
            </div>

            <div className="md:hidden text-right text-sm inline">
              <button onClick={toggleMenu} className="menu-toggle">
                <span role="img" aria-label="">☰</span> menu
              </button>
              <button onClick={handleSearch} className="menu-search ml-3">
                <span role="img" aria-label="">🔍</span> search
              </button>
            </div>
            
            <div className="hidden md:inline site-head-links text-right text-lg py-2 mt-3 sm:mt-0 overflow-scroll">
              <Menu links={links} theme={theme} clickDark={clickDark} handleSearch={handleSearch} id="menu-desktop" />              
            </div>

          </div>

        </div>
      </nav>

      <nav className="hidden md:hidden bg-gray-200 dark:bg-green-900 menu-mobile text-xs overflow-scroll">
        <Menu links={links} theme={theme} toggleMenu={toggleMenu} clickDark={clickDark} id="menu-mobile" />
      </nav>

      <Bands site={site} stuff={stuff} />     

    </header>
  )
}
