import React from 'react'
import {useParams} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import DefaultLayout from '../../layout/Default'
import BlogArticle from '../../components/BlogArticle'


const Blog = () => {
    let { article } = useParams()
    const {t} = useTranslation('blog')
    
    return (
        <>
            <DefaultLayout>
                {/* returnObjects key is necessary to be able to use objects and arrays */}
                {t('articles', { returnObjects: true }).map(({
                    id,
                    slug,
                    title,
                    date,
                    authors,
                    authorsAnd,
                    content
                }) => {

                    // either all articles are displayed,
                    // or the article matching the URL
                    if (article === slug || !article) {
                        return (
                            <BlogArticle
                                slug={slug}
                                title={title}
                                pageTitle={article ? title : ''}
                                date={date}
                                authors={authors}
                                authorsAnd={authorsAnd}
                                content={content}
                                key={id}
                            />
                        )
                    }
                })}
            </DefaultLayout>
        </>
    )
}

export default Blog