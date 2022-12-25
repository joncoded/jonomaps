import React from "react"
import { useParams } from "react-router-dom"
import None from "../Util/None"
import Mapstory from "./Mapstory"

export default function Map({ site, stuff }) {
  const { id } = useParams()

  const post = stuff.filter(p => p.slug === id).shift()

  if (!post) return <None />

  document.title = `${post.title} - ${site.metadata.section_labels.maps} (${site.metadata.section_taglines.maps}) - ${site.metadata.name}`

  return (
    <main id="main" tabIndex="-1" className="w-screen p-0 m-0">

      <Mapstory stuff={post} />

    </main>
  )
}
