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
import { selectUser } from '../../../../components/App/userSelector'
import { useSelector } from 'react-redux'

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
    participantName: string,
    password: string | null
) {
    const api = new Api(instantVisioToken)
    const { jwtAccessToken } = await api.joinRoom(
        roomId,
        participantName,
        password
    )
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
    const instantVisioUser = useSelector(selectUser)

    const [user, setUser] = useState<{
        displayName: undefined
        photoURL: undefined
        passcode: string
    } | null>(null)
    const [isAuthReady, setIsAuthReady] = useState(false)
    const [roomType, setRoomType] = useState<RoomType>()

    const getTwilioVideoToken = useCallback(
        (
            instantVisioToken: string,
            roomId: RoomId,
            participantName: string
        ) => {
            const fetchTokenAndSetRoomType = async (
                instantVisioToken,
                roomId,
                participantName
            ) => {
                const roomPassword = user!.passcode
                const passwordSpecified =
                    !instantVisioUser.isAnonymous && roomPassword === 'admin'
                        ? null
                        : roomPassword
                const token = await fetchTwilioVideoToken(
                    instantVisioToken,
                    roomId,
                    participantName,
                    passwordSpecified
                )
                setRoomType('group')
                return token as string
            }

            return fetchTokenAndSetRoomType(
                instantVisioToken,
                roomId,
                participantName
            )
        },
        [user, instantVisioUser]
    )

    useEffect(() => {
        const passcode = getPasscode()

        if (passcode) {
            verifyPasscode(passcode)
                .then((verification) => {
                    if (verification?.isValid) {
                        setUser({ passcode } as any)
                        window.sessionStorage.setItem('passcode', passcode)
                        window.sessionStorage.setItem('roomUrl', window.location.href)
                        //TODO check if to remove the passcode from url
                        // history.replace(window.location.pathname)
                    }
                })
                .then(() => {
                    setIsAuthReady(true)
                })
        } else {
            setIsAuthReady(true)
        }
    }, [history])

    const signIn = useCallback((passcode: string) => {
        return verifyPasscode(passcode).then((verification) => {
            if (verification?.isValid) {
                setUser({ passcode } as any)
                window.sessionStorage.setItem('passcode', passcode)
                window.sessionStorage.setItem('roomUrl', window.location.href)
            } else {
                throw new Error(getErrorMessage(verification?.error))
            }
        })
    }, [])

    const signOut = useCallback(() => {
        setUser(null)
        window.sessionStorage.removeItem('passcode')
        window.sessionStorage.removeItem('roomUrl')
        return Promise.resolve()
    }, [])

    return { user, isAuthReady, getTwilioVideoToken, signIn, signOut, roomType }
}
