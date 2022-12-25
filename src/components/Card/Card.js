import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useParams, Link } from 'react-router-dom'
import Titleist from '../Util/Titleist'
import None from '../Util/None'

/* react-markdown with syntax highlighting */
const components = {
  code({node, inline, className, children, ...props}) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter 
        style={dark} 
        language={match[1]} 
        PreTag="div" 
        children={String(children).replace(/\n$/, '')} 
        {...props} />
    ) : (
      <code className={className} {...props} />
    )
  }
} 

export default function Card({site, stuff}) {

  const { id } = useParams()

  const post = stuff.filter(p => p.slug === id).shift()    

  if (!post) return <None />

  document.title = `${post.title} - ${site.metadata.name}`

  return (

    <main id="main" tabIndex="-1" className="w-screen">          

      <div className="card-container max-w-screen-lg mx-auto">

      <Titleist section={post.title} subsection="" />

        {/* content thumbnail (optional) */}
        { post.thumbnail !== '' &&
          <div aria-hidden="true" className="my-3" style={{backgroundImage: `url(${post.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center center', height: '200px'}}></div>
        }
      
        <div className="card-content mb-6">
          { post.metadata.alternative_content ? (          
            <ReactMarkdown 
              components={components} 
              children={post.metadata.alternate_content}>            
            </ReactMarkdown>
          ) : (
            <div dangerouslySetInnerHTML={{__html: post.content}}></div>
          )}
        </div>        

        { post.metadata.extension && 
        <div className="card-extension mb-6">
          <div dangerouslySetInnerHTML={{__html: post.metadata.extension}}></div>
        </div> 
        }

        { post.metadata.footnotes && 
        <div className="card-footnotes mb-6 text-sm">          
          <div dangerouslySetInnerHTML={{__html: post.metadata.footnotes}}></div>
        </div> 
        }

        <div className="card-back mb-6">
          &larr; <Link to="/" className="text-green-700">back to home</Link>
        </div>

      </div>

    </main>
  
  )

}