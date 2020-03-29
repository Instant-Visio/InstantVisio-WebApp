import React from 'react'
import {useParams} from 'react-router-dom'
import DefaultLayout from '../../layout/Default'
import BlogArticle from '../../components/BlogArticle'
import blog from '../../data/blog'


const Blog = () => {
    let { article } = useParams()
    
    return (
        <>
            <DefaultLayout>
                {blog.articles.map(({
                    id,
                    slug,
                    title,
                    date,
                    author,
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
                                author={author}
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