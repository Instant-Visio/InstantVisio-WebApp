import styled from 'styled-components'
import { SCREEN } from '../../styles/theme'

const BlogArticleStyled = styled.div`
    p img, p > img {
        display: block;
        margin-top: 1rem;
        width: 100%;

        ${SCREEN.DESKTOP} {
            width: 60%;
        }
    }

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
            margin-bottom: ${({ theme }) => theme.font.XXXL};

            &-text {
                font-size: ${({ theme }) => theme.font.L};
                color: ${({ theme }) => theme.color.black};
                margin-right: ${({ theme }) => theme.spacing.S};
            }

            &-link {
                margin: 0 ${({ theme }) => theme.spacing.XXS};
                &-img {
                    width: 2rem;
                }
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
                margin: 1.5rem 0 4rem;

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

    &:last-of-type {
        .article {
            &-forSharing {
                margin-bottom: 0;
            }
        }
    }
`

export default BlogArticleStyled
