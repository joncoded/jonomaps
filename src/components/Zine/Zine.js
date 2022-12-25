import React from "react"
import { useParams } from "react-router-dom"
import Flip from "../Util/Flip"
import None from "../Util/None"

export default function Zine({ site, stuff }) {
  const { id } = useParams()

  const post = stuff.filter(p => p.slug === id).shift()
  const postType = site.metadata.section_labels[post.type]

  if (!post) return <None />

  document.title = `${post.title} - ${site.metadata.section_labels.zines} (${site.metadata.section_taglines.zines}) - ${site.metadata.name}`

  return (
    <main id="main" tabIndex="-1" className="w-screen">
      <div className="mini-container max-w-screen-lg mx-auto my-0">
        <Flip stuff={stuff} post={post} hidden="true" />

        <div className="mini-proper mb-12">
          {/* title */}
          <h2 className="mini-title text-center mb-6 text-3xl md:text-6xl">{post.title}</h2>

          {/* content thumbnail (optional) */}
          {post.thumbnail !== "" && <div aria-hidden="true" className="my-3" style={{ backgroundImage: `url(${post.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center center", height: "200px" }}></div>}

          {/* content proper */}
          <div className="mini-content text-center unreset" dangerouslySetInnerHTML={{ __html: post.content }}></div>

          {/* content metadata */}
          <p className="text-gray-600 dark:text-gray-200 mt-3 text-xs text-center">
            {post.metadata.date}
            <span aria-hidden="true">&nbsp;&bull;&nbsp;</span>
            <span className="sr-only">in</span>
            {postType}
          </p>
        </div>

        <Flip stuff={stuff} post={post} />
      </div>
    </main>
  )
}
