import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'

import Header from '../Header'
import DefaultStyled from '../../styles/Default'
import BlogArticle from './BlogArticle/index'
import Footer from '../Footer'

import blog from '../../data/blog'

const Blog = () => {
    useEffect(() => {
        document.title = "Blog - Instant Visio"
    }, [])

    let { article } = useParams()
    
    return (
        <>
            <Header />
            <DefaultStyled>
                <Container className="default">
                    {blog.articles.map(({ id, slug, title, date, author, content }) => {

                        if (article === slug || !article) {
                            return (
                                <BlogArticle
                                    slug={slug}
                                    title={title}
                                    date={date}
                                    author={author}
                                    content={content}
                                    key={id}
                                />
                            )
                        }
                    })}
                </Container>
            </DefaultStyled>
            <Footer />
        </>
    )
}

export default Blog