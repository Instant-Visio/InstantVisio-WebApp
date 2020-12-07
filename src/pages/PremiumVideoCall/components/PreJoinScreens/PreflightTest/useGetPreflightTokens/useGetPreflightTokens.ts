/**
 * This file was modified by
 * Mattia Primavera <sconqua@gmail.com>
 */

import { nanoid } from 'nanoid'
import { useAppState } from '../../../../state'
import { useState, useEffect } from 'react'
import { JWTToken } from '../../../../../../../types/JWT'

export default function useGetPreflightTokens(instantVisioToken: JWTToken) {
    const { getToken } = useAppState()
    const [tokens, setTokens] = useState<[string, string]>()
    const [tokenError, setTokenError] = useState<Error>()
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        if (!isFetching && !tokens) {
            const roomName = 'preflight-network-test-' + nanoid()

            setIsFetching(true)

            const publisherIdentity = 'participant-' + nanoid()
            const subscriberIdentity = 'participant-' + nanoid()

            Promise.all([
                getToken(instantVisioToken, publisherIdentity, roomName),
                getToken(instantVisioToken, subscriberIdentity, roomName),
            ])
                .then((tokens) => {
                    setTokens(tokens)
                    setIsFetching(false)
                })
                .catch((error) => setTokenError(error))
        }
    }, [getToken, isFetching, tokens, instantVisioToken])

    return { tokens, tokenError }
}
