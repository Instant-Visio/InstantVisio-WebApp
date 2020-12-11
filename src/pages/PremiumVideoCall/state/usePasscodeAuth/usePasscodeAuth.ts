/**
 * This file was modified by
 * Mattia Primavera <sconqua@gmail.com>
 */

import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RoomType } from '../../types'
import { Api } from '../../../../services/api'
import { JWTToken } from '../../../../../types/JWT'
import { RoomId } from '../../../../../types/Room'

export function getPasscode() {
    const match = window.location.search.match(/passcode=(.*)&?/)
    const passcode = match
        ? match[1]
        : window.sessionStorage.getItem('passcode')
    return passcode
}

export async function fetchTwilioVideoToken(
    instantVisioToken: JWTToken,
    roomId: RoomId,
    password: string
) {
    const api = new Api(instantVisioToken)
    const  { jwtAccessToken } = await api.joinRoom(roomId, password)
    const { jwtAccessToken } = response
    return jwtAccessToken
}

export async function verifyPasscode(passcode: string) {
    return { isValid: true, error: '' }
}

export function getErrorMessage(message: string) {
    switch (message) {
        case 'passcode incorrect':
            return 'Passcode is incorrect'
        case 'passcode expired':
            return 'Passcode has expired'
        default:
            return message
    }
}

export default function usePasscodeAuth() {
    const history = useHistory()

    const [user, setUser] = useState<{
        displayName: undefined
        photoURL: undefined
        passcode: string
    } | null>(null)
    const [isAuthReady, setIsAuthReady] = useState(false)
    const [roomType, setRoomType] = useState<RoomType>()

    const getTwilioVideoToken = useCallback(
        (instantVisioToken: string, roomId: RoomId) => {
            const fetchTokenAndSetRoomType = async (
                instantVisioToken,
                roomId
            ) => {
                const token = await fetchTwilioVideoToken(
                    instantVisioToken,
                    roomId,
                    user!.passcode
                )

                setRoomType('group')
                return token as string
            }

            return fetchTokenAndSetRoomType(instantVisioToken, roomId)
        },
        [user]
    )

    useEffect(() => {
        const passcode = getPasscode()

        if (passcode) {
            verifyPasscode(passcode)
                .then((verification) => {
                    if (verification?.isValid) {
                        setUser({ passcode } as any)
                        window.sessionStorage.setItem('passcode', passcode)
                        history.replace(window.location.pathname)
                    }
                })
                .then(() => setIsAuthReady(true))
        } else {
            setIsAuthReady(true)
        }
    }, [history])

    const signIn = useCallback((passcode: string) => {
        return verifyPasscode(passcode).then((verification) => {
            if (verification?.isValid) {
                setUser({ passcode } as any)
                window.sessionStorage.setItem('passcode', passcode)
            } else {
                throw new Error(getErrorMessage(verification?.error))
            }
        })
    }, [])

    const signOut = useCallback(() => {
        setUser(null)
        window.sessionStorage.removeItem('passcode')
        return Promise.resolve()
    }, [])

    return { user, isAuthReady, getTwilioVideoToken, signIn, signOut, roomType }
}
