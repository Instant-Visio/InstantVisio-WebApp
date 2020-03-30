import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { DateTime } from 'luxon'
import ReactMarkdown from 'react-remarkable'

import BlogArticleStyled from './BlogArticle'
import blog from '../../data/blog'

const BlogArticle = ({
    slug,
    title,
    pageTitle,
    date,
    authors,
    authorsAnd,
    content
}) => {

    useEffect(() => {
        if (pageTitle) {
            document.title = `${pageTitle} - Blog - Instant Visio`
        } else {
            document.title = 'Blog - Instant Visio'
        }
    }, [])

    return(
        <BlogArticleStyled>
            <Link to={`/blog/${slug}`} className="article-title"><h2 className="default-title">{title}</h2></Link>
            <p className="article-dateAuthor">{DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)}, par {authors.join(` ${authorsAnd} `)}</p>
            <ReactMarkdown source={content} />
            <div className="article-forSharing">
                Partager sur :
            </div>
            {blog.socialMedia.map(({ id, name, sharer, addedSharer, picture }) => { 
                const checkAddedSharer = addedSharer ? addedSharer + encodeURI(title) : ''
                return (
                    <a className="article-share" key={id} href={`${sharer}https://instantvisio.com/${slug}${checkAddedSharer}`} target="_blank" rel="noopener noreferrer">
                        <img src={picture} alt={name} />
                    </a>
                )}
            )}
        </BlogArticleStyled>
    )
}

export default BlogArticle