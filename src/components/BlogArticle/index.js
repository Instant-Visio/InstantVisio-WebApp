import React from 'react'
import {Link} from 'react-router-dom'
import { DateTime } from 'luxon'
import ReactMarkdown from 'react-remarkable'
import { useTranslation } from 'react-i18next'

import useDocumentTitle from '../../hooks/useDocumentTitle'
import BlogArticleStyled from './BlogArticle'
import blog from '../../data/js/blog'

const BlogArticle = ({
    slug,
    title,
    pageTitle,
    date,
    authors,
    authorsAnd,
    content
}) => {
    const {t} = useTranslation('blog')
    const defaultTitle = 'Blog - Instant Visio'

    useDocumentTitle(pageTitle ? `${pageTitle} - ${defaultTitle}` : defaultTitle)

    return(
        <BlogArticleStyled>
            <Link to={`/blog/${slug}`} className="article-title"><h2 className="default-title">{title}</h2></Link>
            <p className="article-dateAuthor">{DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)}, par {authors.join(` ${authorsAnd} `)}</p>
            <ReactMarkdown source={content} />
            <div className="article-forSharing">
                <div className="article-forSharing-text">
                    {t('share')}
                </div>
                {blog.socialMedia.map(({ id, name, sharer, addedSharer, picture }) => { 
                    const checkAddedSharer = addedSharer ? addedSharer + encodeURI(title) : ''
                    return (
                        <a className="article-forSharing-link" key={id} href={`${sharer}https://instantvisio.com/${slug}${checkAddedSharer}`} target="_blank" rel="noopener noreferrer">
                            <img className="article-forSharing-link-img" src={picture} alt={name} />
                        </a>
                    )}
                )}
            </div>
        </BlogArticleStyled>
    )
}

export default BlogArticle