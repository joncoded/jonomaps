import React from "react"
import { Link } from "react-router-dom"

export default function Meta({ site, post }) {
  const metaHeight = post.thumbnail === "" || post.thumbnail === undefined ? "10vh" : "50vh"

  const postDate = post.metadata !== null && post.metadata.date ? post.metadata.date : post.created_at.substring(0, 10)

  const postCategory = post.metadata !== null && post.metadata.category ? (post.metadata.category.value ? post.metadata.category.value : post.metadata.category) : ""

  const postType = site.metadata.section_labels[post.type]

  return (
    <div aria-label="" className="my-3 flex items-center" style={{ backgroundImage: `url(${post.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center center", height: `${metaHeight}` }}>
      <div className="bg-white dark:bg-black bg-opacity-95 dark:bg-opacity-75 text-center mx-auto p-6">
        <h2 className="blog-title text-2xl md:text-4xl font-bold">{post.title}</h2>

        <p className="blog-metadata mt-3 mb-0 text-sm md:text-lg">
          <span className="blog-metadata-date mr-1 whitespace-nowrap">{postDate}</span>
          <span aria-hidden="true">&nbsp;&bull;&nbsp;</span>
          <span className="blog-metadata-type mr-1">
            <Link className="font-semibold text-green-800 hover:text-green-900 hover:underline dark:text-green-200 dark:hover:text-white" to={`/${postType}/`}>
              {postType}
            </Link>
          </span>
          {postCategory && (
            <>
              <span aria-hidden="true">&nbsp;&bull;&nbsp;</span>
              <span className="blog-metadata-category">
                <Link className="text-green-800 hover:text-green-900 hover:underline dark:text-green-200 dark:hover:text-white" to={`/${postType}/${postCategory}`}>
                  {postCategory}
                </Link>
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
