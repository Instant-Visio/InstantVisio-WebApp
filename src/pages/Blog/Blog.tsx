import React from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import DefaultLayout from 'src/layout/Default/Default'
import BlogArticle from 'src/components/BlogArticle/BlogArticle'
import { IonContent } from '@ionic/react'

const Blog = () => {
    let { post } = useParams()
    const { t } = useTranslation('blog')

    // returnObjects key is necessary to be able to use objects and arrays
    const blogPosts: [] = t('posts', { returnObjects: true })
    return (
        <>
            <IonContent>
                <DefaultLayout>
                    {blogPosts
                        .reverse()
                        .map(
                            ({
                                id,
                                slug,
                                title,
                                date,
                                authors,
                                authorsAnd,
                                content,
                            }) => {
                                // either all articles are displayed,
                                // or the post matching the URL
                                if (post === slug || !post) {
                                    return (
                                        <BlogArticle
                                            slug={slug}
                                            title={title}
                                            pageTitle={post ? title : ''}
                                            date={date}
                                            authors={authors}
                                            authorsAnd={authorsAnd}
                                            content={content}
                                            key={id}
                                        />
                                    )
                                }
                                return ''
                            }
                        )}
                </DefaultLayout>
            </IonContent>
        </>
    )
}

export default Blog
