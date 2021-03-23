import React, { useState } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { Api } from '../../../services/api'
import { openPremiumVideoCall } from '../../../services/safari-view-controller'
import { selectToken } from '../../../components/App/userSelector'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useInterval } from '../../../hooks/useInterval'

const ONGOING_CALLS_FETCH_INTERVAL = 1000 * 60

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

export const OnGoingCalls = () => {
    const { t } = useTranslation('home')
    const [onGoingCalls, setOnGoingCalls] = useState<any>([])
    const token = useSelector(selectToken)

    useInterval(async () => {
        if (token) {
            const api = new Api(token)
            const onGoingCalls = await api.getOngoingCalls()
            setOnGoingCalls(onGoingCalls)
        }
    }, ONGOING_CALLS_FETCH_INTERVAL)

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
                    <Typography variant="body1">
                        {t('home:ongoing-calls.calls')}
                    </Typography>
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
                                            {t('home:ongoing-calls.join')}
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
