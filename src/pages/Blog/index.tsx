import React from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import DefaultLayout from '../../layout/Default'
import BlogArticle from '../../components/BlogArticle'
import { IonContent } from '@ionic/react'

const Blog = () => {
    let { post } = useParams()
    const { t } = useTranslation('blog')

    return (
        <>
            <IonContent>
                <DefaultLayout>
                    {/* returnObjects key is necessary to be able to use objects and arrays */}
                    {t('posts', { returnObjects: true })
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
