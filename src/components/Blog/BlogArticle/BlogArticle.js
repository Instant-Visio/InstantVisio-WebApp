import styled from 'styled-components'
import theme from '../../../styles/theme'


const BlogArticleStyled = styled.div`
    .article {
        &-title {
            text-decoration: none;

            h2 {
                color: ${theme.color.textBlue};
            }
        }

        &-dateAuthor {
            color: #787886;
        }

        &-forSharing {
            margin-right: ${theme.spacing.XS}
        }

        &-share {
            margin: 0 ${theme.spacing.XXS}
        }
    }

    @media (min-width: 300px) {
        .article {
            &-forSharing {
                margin-bottom: ${theme.spacing.S}
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
