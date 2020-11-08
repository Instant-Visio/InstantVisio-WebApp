import { useEffect } from 'react'

export default (title) => {
    useEffect(() => {
        title && (document.title = title)
    }, [title])
}
