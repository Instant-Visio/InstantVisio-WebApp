import { State } from './../reducers/index'
import { fetchToken } from './../services/fetch-token'
import { JWTToken } from '../../types/JWT'
import {
    SIGNOUT,
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    SetSignInAction,
    SetSignInError,
    SetSignOut,
} from './userActionsTypes'
import { authInstance } from '../firebase/firebase'

type DidSignIn = (
    user: firebase.User | null
) => (dispatch, getState: () => State) => Promise<void>

const setSignInSuccess = (
    token: JWTToken,
    isAnonymous: boolean
): SetSignInAction => ({
    type: SIGNIN_SUCCESS,
    payload: {
        token,
        isAnonymous,
    },
})

const setSignInError = (error): SetSignInError => ({
    type: SIGNIN_ERROR,
    payload: {
        error,
    },
})

const setSignOut = (): SetSignOut => ({
    type: SIGNOUT,
})

export const didSignin: DidSignIn = (user) => async (dispatch, getState) => {
    const { user: userState } = getState()

    if (userState.token) {
        return
    }

    if (user) {
        try {
            const token = await fetchToken(user.uid)
            dispatch(
                setSignInSuccess(
                    token,
                    Boolean(authInstance.currentUser?.isAnonymous)
                )
            )
        } catch (error) {
            dispatch(setSignInError(error))
        }
    } else {
        dispatch(signOut())
    }
}

export const signOut = () => async (dispatch): Promise<void> => {
    await authInstance.signOut()
    dispatch(setSignOut())
}
