import React, { useEffect } from 'react'
import { authInstance } from '../../../firebase/firebase'
import { didSignin, signInAnonymously } from '../../../actions/userActions'
import { useDispatch } from 'react-redux'
import { hideLoginModal } from '../../LoginModal/loginModalActions'

const AuthStateChangedListener = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        return authInstance.onAuthStateChanged((firebaseUser: any) => {
            const user = firebaseUser || firebaseUser?.user
            if (user) {
                dispatch(didSignin(user))
            } else {
                dispatch(signInAnonymously())
            }
            dispatch(hideLoginModal())
        })
    }, [dispatch])

    return <></>
}

export default AuthStateChangedListener
