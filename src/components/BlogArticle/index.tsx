import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'
import ReactMarkdown from 'react-remarkable'
import { useTranslation } from 'react-i18next'
import { truncate } from 'lodash'

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
    content,
}) => {
    const { t } = useTranslation(['common', 'blog'])
    const defaultTitle = 'Blog - Instant Visio'

    const blogArticle: any = useRef(null)

    useDocumentTitle(
        pageTitle ? `${pageTitle} - ${defaultTitle}` : defaultTitle
    )

    useEffect(() => {
        if (blogArticle && blogArticle.current) {
            Array.from(blogArticle.current.querySelector('span')?.children).map(
                (el: any) => {
                    if (!pageTitle) {
                        el.style.display = 'inline'
                        el.style.listStyle = 'none'
                        el.style.padding = '0'
                        Array.from(el.children).map((elChild: any) => {
                            elChild.style.listStyle = 'none'
                            return ''
                        })
                    } else {
                        el.style.display = 'block'
                    }
                    return ''
                }
            )
        }
    })

    const formattedDate = t('blog:dateArticle')
        ? `${t('blog:dateArticle')} ${DateTime.fromISO(date).toLocaleString(
              DateTime.DATE_FULL
          )}`
        : DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)

    return (
        <BlogArticleStyled ref={blogArticle}>
            <Link
                to={`/${t('common:url.blog')}/${slug}`}
                className="article-title">
                <h2 className="default-title">{title}</h2>
            </Link>
            <p className="article-dateAuthor">
                {formattedDate}, par {authors.join(` ${authorsAnd} `)}
            </p>
            {pageTitle && <ReactMarkdown source={content} />}
            {!pageTitle && (
                <ReactMarkdown>
                    {truncate(content, { length: 165, separator: /,?\.* +/ })}
                    <Link to={`/${t('common:url.blog')}/${slug}`}>
                        {t('blog:readArticle')}
                    </Link>
                </ReactMarkdown>
            )}
            <div className="article-forSharing">
                <div className="article-forSharing-text">{t('blog:share')}</div>
                {blog.socialMedia.map(
                    ({ id, name, sharer, addedSharer, picture }) => {
                        const checkAddedSharer = addedSharer
                            ? addedSharer + encodeURI(title)
                            : ''
                        return (
                            <a
                                className="article-forSharing-link"
                                key={id}
                                href={`${sharer}https://instantvisio.com/${t(
                                    'common:url.blog'
                                )}/${slug}${checkAddedSharer}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                <img
                                    className="article-forSharing-link-img"
                                    src={picture}
                                    alt={name}
                                />
                            </a>
                        )
                    }
                )}
            </div>
        </BlogArticleStyled>
    )
}

export default BlogArticle
