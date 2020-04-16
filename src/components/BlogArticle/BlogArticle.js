import styled from 'styled-components'
import { SCREEN } from '../../styles/theme'

const BlogArticleStyled = styled.div`
    .article {
        &-title {
            text-decoration: none;

            h2 {
                color: ${({ theme }) => theme.color.textBlue};
                margin-bottom: ${({ theme }) => theme.spacing.M};
            }
        }

        &-dateAuthor {
            color: #787886;
        }

        &-forSharing {
            margin-bottom: ${({ theme }) => theme.font.XXL};

            &-text {
                font-size: ${({ theme }) => theme.font.L};
                margin-right: ${({ theme }) => theme.spacing.S};
            }

            &-link {
                margin: 0 ${({ theme }) => theme.spacing.XXS};
            }
        }
    }

    ${SCREEN.MOBILE_AND_TABLET} {
        .article {
            &-forSharing {
                &-text {
                    margin-bottom: ${({ theme }) => theme.spacing.S};
                }

                &-link {
                    &-img {
                        margin-bottom: 1rem;
                    }
                }
            }
        }
    }

    ${SCREEN.DESKTOP} {
        .article {
            &-forSharing {
                margin-bottom: ${({ theme }) => theme.font.XXXL};

                &-text {
                    display: inline-block;
                    margin-bottom: 0;
                }

                &-link {
                    &-img {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
`

export default BlogArticleStyled
