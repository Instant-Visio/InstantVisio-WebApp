import React, {useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'

import BlogArticleStyled from './BlogArticle'
import blog from '../../../data/blog'

const BlogArticle = ({
    slug,
    title,
    date,
    author,
    content
}) => {
    const blogContent = useRef(null)

    useEffect(() => {
        document.title = `${title} - Blog - Instant Visio`
        blogContent.current.innerHTML = content
    }, [])

    return(
        <BlogArticleStyled>
            <Link to={`/blog/${slug}`} className="article-title"><h2 className="default-title">{title}</h2></Link>
            <p className="article-dateAuthor">Le {date}, par {author}</p>
            <div ref={blogContent} />
            <div className="article-forSharing">
                Partager sur :
            </div>
            {blog.socialMedia.map(({ id, name, sharer, addedSharer, picture }) => { 
                const checkAddedSharer = addedSharer ? addedSharer + encodeURI(title) : ''
                return (
                    <a className="article-share" key={id} href={`${sharer}https://instantvisio.com/${slug}${checkAddedSharer}`} target="_blank">
                        <img src={picture} alt={name} />
                    </a>
                )}
            )}
        </BlogArticleStyled>
    )
}

export default BlogArticle