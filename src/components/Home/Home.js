import React, { useEffect, useState } from "react"
import PrePost from "../Util/PrePost"
import Titleist from "../Util/Titleist"
import { sortMetadata } from "../Util/Func"

export default function Home({ site, stuff }) {

  let data = stuff.filter(post => ["desk", "maps"].indexOf(post.type) >= 0)
  
  data = sortMetadata(data, "metadata", "date", "desc")
  data = sortMetadata(data, "metadata", "order", "desc")
  
  const [results] = useState(data) 
  useEffect(() => {
    setTimeout(() => document.title = `${site.metadata.name} - ${site.metadata.tagline}`, 500);    
  }, [])
  
  return (
    <main id="main" tabIndex="-1" className="max-w-screen-lg w-screen mx-auto my-0 pb-12">

      <div className="feed-head mt-6 flex flex-col md:flex-row items-center gap-3">
        <Titleist section={site.metadata.home_title} />                
        {site.metadata.home && (
          <div className="home-head border-2 border-gray-900 dark:border-white bg-white text-black dark:bg-green-900 dark:text-gray-200 p-3 flex-grow">
            <div className="text-sm md:text-2xl text-center sm:text-left" dangerouslySetInnerHTML={{ __html: site.metadata.home }}></div>
          </div>
        )}
      </div>      

      <div className="feed-list mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.length > 0 && results.map(post => (
          
          <PrePost key={post.id} site={site} post={post} showDate="true" showType="true" external={post.type === "desk" ? true : false} />)
          
        )}        
      </div>
    </main>

  )
}
