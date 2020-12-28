import { AppState } from './../reducers/rootReducer'
import { fetchToken } from './../services/fetch-token'
import { JWTToken } from '../../types/JWT'
import {
    SIGNOUT,
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    UserActionsTypes,
    REGISTER_PUSH_NOTIF_TOKEN,
} from './userActionsTypes'
import { authInstance } from '../firebase/firebase'
import { UID } from '../../types/uid'
import {
    hideBackdrop,
    showBackdrop,
} from '../components/App/Backdrop/backdropActions'

type DidSignIn = (
    user: firebase.User | null
) => (dispatch, getState: () => AppState) => Promise<void>

const setSignInSuccess = (
    token: JWTToken,
    isAnonymous: boolean,
    userId: UID
): UserActionsTypes => ({
    type: SIGNIN_SUCCESS,
    payload: {
        token,
        isAnonymous,
        userId,
    },
})

const setSignInError = (error): UserActionsTypes => ({
    type: SIGNIN_ERROR,
    payload: {
        error,
    },
})

const setSignOut = (): UserActionsTypes => ({
    type: SIGNOUT,
})

export const setRegistrationToken = (
    registrationToken: string
): UserActionsTypes => ({
    type: REGISTER_PUSH_NOTIF_TOKEN,
    payload: {
        registrationToken,
    },
})

export const didSignin: DidSignIn = (user) => async (dispatch, getState) => {
    const { user: userState } = getState()
    if (userState.user.token) {
        dispatch(hideBackdrop())
        return
    }

    if (user) {
        try {
            const token = await fetchToken(user.uid)
            dispatch(
                setSignInSuccess(
                    token,
                    Boolean(authInstance.currentUser?.isAnonymous),
                    user.uid
                )
            )
        } catch (error) {
            //TODO handle errors
            dispatch(setSignInError(error))
        }
    } else {
        dispatch(signOut())
    }

    dispatch(hideBackdrop())
}

export const signOut = () => async (dispatch): Promise<void> => {
    dispatch(showBackdrop())
    await authInstance.signOut()
    dispatch(setSignOut())
    dispatch(hideBackdrop())
}
