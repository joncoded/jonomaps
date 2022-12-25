import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { sortMetadata } from "../Util/Func"

export default function Find({site, stuff}) {

  let data = stuff.filter(post => ["desk", "maps", "pics", "text", "wiki", "zine"].indexOf(post.type) >= 0)
  data = sortMetadata(data, "metadata", "date", "desc")  

  const [results, setResults] = useState(data)
  const [findTerm, setFindTerm] = useState('')    

  function closeThis() {
    document.getElementById('find').classList.toggle('hidden')
    setResults([])
  }

  function handleFindTerm(e) {
    e.preventDefault();
    setFindTerm(e.target.value)
  }

  useEffect(() => {

    if (findTerm.length > 1) {
      setResults(data.filter(slice => {
        const formattedTitle = slice.title.toLowerCase()
        const formattedSummary = slice.metadata.summary.toLowerCase()
        const formattedDate = slice.metadata.date || slice.modified_at
        const formattedQuery = findTerm.toLowerCase().trim()
        return formattedTitle.indexOf(formattedQuery) > -1 || formattedSummary.indexOf(formattedQuery) > -1 || formattedDate.indexOf(formattedQuery) > -1
      }))      
    }
    if (findTerm.length === 0) {
      setResults([])
    }
    
  }, [findTerm])

  return (
    <div id="find" className="find-container hidden w-screen h-full p-6 bg-white dark:bg-black text-black dark:text-white">
      <div id="find-cont" className="max-w-screen-lg mx-auto">
        <div id="find-input" className="flex">
          <label htmlFor="search" className="mr-3 sr-only">search</label>        
          <input onChange={handleFindTerm}  id="search" autoComplete="off" className="border flex-grow bg-white dark:bg-gray-700 text-black dark:text-white" type="text" value={findTerm} placeholder="search (results will appear below)" />        
          <button onClick={closeThis} className="text-xl ml-3" aria-label="Close">&times;</button>      
        </div>
        <div id="find-output" className="find-output">
          {results && <ul className="mt-3">
            {results.map(post => {
              const postDate = post.metadata.date;
              const postCategory = post.metadata !== null && post.metadata.category ? (post.metadata.category.value ? post.metadata.category.value : post.metadata.category) : ""      
              const postType = site.metadata.section_labels[post.type]              
              const postLink = postCategory !== "" ? `/${postType}/${postCategory}/${post.slug}` : `/${postType}/${post.slug}`                        
              const linkStyle = "text-green-800 dark:text-green-300 hover:underline hover:text-black dark:hover:text-white text-lowercase text-xl font-bold"
              return (
                <li key={post.id} className="flex gap-3 text-sm md:text-md mb-3">                
                  <div className="whitespace-nowrap">{postDate}</div>
                  <div className="whitespace-nowrap font-bold">[ {postType} ]</div>
                  <div>
                    <p>
                      {post.type === "desk" ? 
                      <a className={linkStyle} href={post.metadata.url} rel="noopener noreferrer" target="_blank">{post.title}</a>
                      :
                      <Link onClick={closeThis} to={postLink} className={linkStyle}>{post.title}</Link>}
                    </p>
                    <p className="hidden md:block">{post.metadata.summary}</p>
                  </div>
                </li>
              )
            })}         
          </ul>}
          {results.length === 0 && findTerm !== '' && <p>{site.metadata.message_labels.no_content}</p>}
        </div>
      </div>
    </div>
  )
}