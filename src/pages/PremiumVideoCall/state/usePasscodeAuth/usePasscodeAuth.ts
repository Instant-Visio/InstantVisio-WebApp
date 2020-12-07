/**
 * This file was modified by
 * Mattia Primavera <sconqua@gmail.com>
 */

import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RoomType } from '../../types'
import { Api } from '../../../../services/api'
import { JWTToken } from '../../../../../functions/src/types/JWT'

export function getPasscode() {
    const match = window.location.search.match(/passcode=(.*)&?/)
    const passcode = match
        ? match[1]
        : window.sessionStorage.getItem('passcode')
    return passcode
}

export function fetchToken(
    instantVisioToken: JWTToken,
    name: string,
    room: string,
    passcode: string,
    create_room = true
) {
    const api = new Api(instantVisioToken)
    return api
        .createRoom()
        .then((response) => {
            return response.roomId
        })
        .then((roomId) => {
            return api.joinRoom(roomId)
        })
        .then((response) => {
            const { jwtAccessToken } = response
            return jwtAccessToken
        })
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

    const getToken = useCallback(
        (instantVisioToken: string, name: string, room: string) => {
            return fetchToken(
                instantVisioToken,
                name,
                room,
                user!.passcode
            ).then((token) => {
                setRoomType('group')
                return token as string
            })
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

    return { user, isAuthReady, getToken, signIn, signOut, roomType }
}
