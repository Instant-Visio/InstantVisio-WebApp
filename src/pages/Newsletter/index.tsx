import React from 'react'
import styled from 'styled-components'

const StyledIframe = styled.div`
    .no-border {
        border-width: 0px;
    }
`

export default function Newsletter() {
    return (
        <StyledIframe>
            <iframe
                className="no-border"
                title="Newsletter"
                width="100%"
                height="500rem"
                src={
                    'https://instantvisio.us19.list-manage.com/subscribe?u=54f72daf5d7948c23e68e8acb&id=b8e26c1a9a'
                }
            />
        </StyledIframe>
    )
}
