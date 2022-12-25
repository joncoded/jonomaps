import React from "react"
import { Link } from "react-router-dom"

export default function PrePost({ site, post, external, showDate, showType }) {

  const postDate = post.metadata.date;
  const postCategory = post.metadata !== null && post.metadata.category ? (post.metadata.category.value ? post.metadata.category.value : post.metadata.category) : ""      
  const postType = site.metadata.section_labels[post.type]  
  const postLink = postCategory !== "" ? `/${postType}/${postCategory}/${post.slug}` : `/${postType}/${post.slug}`

  function PrePostCard() {
    return (
      <div aria-label="" className="w-full grid justify-center items-center border-2 bg-gray-900 dark:bg-gray-800" style={{ 
        backgroundImage: `url(${post.thumbnail})`, 
        backgroundSize: "cover", 
        backgroundPosition: "center center", 
        minHeight: "150px"
      }}>

        <div className="bg-black dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-80 text-white hover:bg-black hover:bg-opacity-100 dark:hover:bg-white hover:text-white dark:hover:text-black m-3">

          <h2 className="p-3 text-2xl text-center">
            {post.title}
          </h2>
        
        </div>

      </div>
    )
  }  

  return (
    <div className="pre-post" key={post.slug}>

      <div className="pre-post-meta w-full flex place-content-between text-gray-600 dark:text-gray-200 text-sm">

        <div className="pre-post-meta-date">
         {post.metadata.order > 0 && (<span role="img" aria-label="sticky">📌</span>)} {showDate ? postDate : ""}
        </div>
        <div className="pre-post-meta-type">
          { showType && <span>{postType}</span>}
        </div>

      </div>

      { external ? (        
        <a className="pre-post-card" href={post.metadata.url} rel="noopener noreferrer" target="_blank"><PrePostCard /></a>
      ) : (         
        <Link className="pre-post-card" to={postLink}><PrePostCard /></Link>
      )}

      {post.metadata.summary && (
        <p className="pre-post-tail cursor-default text-center text-gray-800 dark:text-white mt-3 mx-auto w-2/3 text-sm" dangerouslySetInnerHTML={{ __html: post.metadata.summary }}></p>
      )}
      
    </div>
  )
}
