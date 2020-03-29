import styled from 'styled-components'


const BlogArticleStyled = styled.div`
    .article {
        &-title {
            text-decoration: none;

            h2 {
                color: ${({theme}) => theme.color.textBlue};
                margin-bottom: ${({theme}) => theme.spacing.M};
            }
        }

        &-dateAuthor {
            color: #787886;
        }

        &-forSharing {
            font-size: ${({theme}) => theme.font.L};
            margin-right: ${({theme}) => theme.spacing.S};
        }

        &-share {
            margin: 0 ${({theme}) => theme.spacing.XXS};
        }
    }

    @media (min-width: 300px) {
        .article {
            &-forSharing {
                margin-bottom: ${({theme}) => theme.spacing.S};
            }
        }
    }

    @media (min-width: 1024px) {
        .article {
            &-forSharing {
                display: inline-block;
                margin-bottom: 0;
            }
        }
    }
`

export default BlogArticleStyled
