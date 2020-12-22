import React, { useEffect } from 'react'
import { authInstance } from '../../../firebase/firebase'
import { didSignin } from '../../../actions/userActions'
import { useDispatch } from 'react-redux'
import { hideLoginModal } from '../../LoginModal/loginModalActions'

const LoginState = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        return authInstance.onAuthStateChanged((user) => {
            console.log('Auth state changed: ', user)
            dispatch(didSignin(user))
            dispatch(hideLoginModal())
        })
    }, [dispatch])

    return <></>
}

export default LoginState
