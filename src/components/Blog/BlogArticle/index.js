import React, {useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'

import BlogArticleStyled from './BlogArticle'

const BlogArticle = ({
    slug,
    title,
    date,
    author,
    content
}) => {
    const blogContent = useRef(null)

    useEffect(() => {
        blogContent.current.innerHTML = content
    }, [])

    return(
        <BlogArticleStyled>
            <Link to={`/blog/${slug}`} className="article-title"><h2 className="default-title">{title}</h2></Link>
            <p className="article-dateAuthor">Le {date}, par {author}</p>
            <div ref={blogContent} />
        </BlogArticleStyled>
    )
}

export default BlogArticle