import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const StyledEmulatorLogin = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
`

export const EmulatorLogin = ({ authInstance }) => {
    const history = useHistory()
    const isAnonymous = authInstance.currentUser?.isAnonymous

    return (
        <StyledEmulatorLogin>
            <span>Emulator Signin: </span>
            {!isAnonymous && (
                <Button onClick={() => history.push('/admin')}>Admin</Button>
            )}
        </StyledEmulatorLogin>
    )
}
