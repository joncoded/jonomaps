import React from "react"
import { Link } from "react-router-dom"

export default function Flip({ stuff, post, hidden }) {
  // const samePost = stuff.filter(s => s.metadata.category.value === post.metadata.category.value)
  const samePostType = stuff.filter(s => s.type === post.type)

  /* for navigating to previous and next pages */
  const older = samePostType.filter(p => p.metadata.date < post.metadata.date).shift()
  const newer = samePostType.filter(p => p.metadata.date > post.metadata.date).pop()

  return (
    <div className={`flip-nav grid sm:grid-cols-2 mb-6 text-sm ${hidden === "true" ? "hidden" : ""}`} aria-hidden={hidden}>
      <div className="text-center sm:text-left mb-6">
        {older && (
          <div>
            previous:
            <br />
            <Link className="text-green-700 dark:text-green-200 hover:underline dark:hover:text-white" to={older.slug}>
              {older.title}
            </Link>
          </div>
        )}
      </div>

      <div className="text-center sm:text-right">
        {newer && (
          <div>
            next:
            <br />
            <Link className="text-green-700 dark:text-green-200 hover:underline dark:hover:text-white" to={newer.slug}>
              {newer.title}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
