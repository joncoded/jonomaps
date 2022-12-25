/* tying it all up together */

import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import useSWR from "swr"
import Cosmic from "cosmicjs"

import Load from "./components/Util/Load"
import GoUp from "./components/Util/GoUp"
import Skip from "./components/Util/Skip"

import Head from "./components/Util/Head"

import Home from "./components/Home/Home"

import Card from "./components/Card/Card"
import Desks from "./components/Desk/Desks"
import Map from "./components/Maps/Map"
import Maps from "./components/Maps/Maps"
import Tail from "./components/Util/Tail"

import "./App.css"

/* cosmic time travel stuff */

const { REACT_APP_SLUG, REACT_APP_READ_KEY } = process.env
const api = Cosmic()
const bucket = api.bucket({
  slug: REACT_APP_SLUG,
  read_key: REACT_APP_READ_KEY
})

const fetchStuff = async () => {
  const caseData = await bucket.getObjects({
    sort: "-created_at"
  })
  return caseData
}

/* cosmicon user interface engine */

export default function App() {
  const { data } = useSWR("fetch-posts", fetchStuff)

  // TODO : better loading component
  if (!data) return <Load />

  const stuff = data.objects
  const site = stuff.filter(post => post.type === "admin")[0]

  function handleSearch() {
    document.getElementById('find').classList.toggle('hidden')
    window.scrollTo(0, 0);  
    document.getElementById('search').focus()    
  }

  return (
    <div className="flex flex-col min-h-screen dark:bg-black dark:text-white">
      <Router>
        <GoUp>
          <Skip />          

          <Head site={site} stuff={stuff} handleSearch={handleSearch} />          

          <Switch>
            <Route path={`/`} exact render={props => <Home site={site} stuff={stuff} />} />

            <Route path={`/${site.metadata.section_labels["desk"]}/`} exact render={props => <Desks site={site} stuff={stuff} />} />

            <Route path={`/${site.metadata.section_labels["maps"]}/:id`} render={props => <Map site={site} stuff={stuff} />} />

            <Route path={`/${site.metadata.section_labels["maps"]}/`} exact render={props => <Maps site={site} stuff={stuff} />} />

            <Route path={`/home/`} render={props => <Home site={site} stuff={stuff} />} />

            <Route path={`/pages/:id`} render={props => <Card site={site} stuff={stuff} />} />            
            
          </Switch>

          <Tail site={site} />
        </GoUp>
      </Router>
    </div>
  )
}
