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
    }
`

export default BlogArticleStyled
