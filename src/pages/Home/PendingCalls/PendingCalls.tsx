import React, { useEffect, useState } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { Api } from '../../../services/api'
import { openPremiumVideoCall } from '../../../services/safari-view-controller'
import { selectToken } from '../../../components/App/userSelector'
import { useSelector } from 'react-redux'

const StyledPendingCalls = styled.div`
    font-size: ${({ theme }) => theme.font.S};
`

const StyledCard = styled.div`
    background: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.grey};
    padding: ${({ theme }) => `${theme.spacing.XXL} ${theme.spacing.XL}`};
    border-radius: 0.5rem;

    & [role='tab'] {
        outline: none;
    }
`

export const PendingCalls = () => {
    const [onGoingCalls, setOnGoingCalls] = useState<any>([])
    const token = useSelector(selectToken)
    const api = new Api(token)

    useEffect(() => {
        api.getOngoingCalls().then((onGoingCalls) =>
            setOnGoingCalls(onGoingCalls)
        )
    }, [api])

    const getGroupName = (currentCall) => {
        const { destinations } = currentCall
        const [destination] = destinations.filter(
            (destination) => destination.groupId
        )
        if (destination) {
            return `(${destination.groupId})`
        } else return ''
    }

    const formatCallStartsAt = (callDate) => {
        return new Date(callDate).toLocaleString()
    }

    return onGoingCalls.length ? (
        <StyledCard style={{ marginBottom: '0.5rem' }}>
            <Grid container spacing={1} direction="column">
                <Grid item style={{ fontWeight: 'bold' }}>
                    <Typography variant="body1">Appels en cours</Typography>
                </Grid>
                <StyledPendingCalls style={{ width: '100%' }}>
                    <Grid item container alignItems="center">
                        {onGoingCalls.map((currentCall) => {
                            return (
                                <>
                                    <Grid item xs={8}>
                                        <p>
                                            {currentCall.name}{' '}
                                            {getGroupName(currentCall)}{' '}
                                            {formatCallStartsAt(
                                                currentCall.startAt * 1000
                                            )}
                                        </p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() =>
                                                openPremiumVideoCall(
                                                    currentCall.roomUrl
                                                )
                                            }>
                                            Rejoindre
                                        </Button>
                                    </Grid>
                                </>
                            )
                        })}
                    </Grid>
                </StyledPendingCalls>
            </Grid>
        </StyledCard>
    ) : (
        <></>
    )
}
