import React, { useEffect } from 'react'
import { authInstance } from '../../../firebase/firebase'
import { didSignin } from '../../../actions/userActions'
import { useDispatch } from 'react-redux'
import { hideLoginModal } from '../../LoginModal/loginModalActions'

const AuthStateChangedListener = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        return authInstance.onAuthStateChanged((user: any) => {
            dispatch(didSignin(user || user?.user))
            dispatch(hideLoginModal())
        })
    }, [dispatch])

    return <></>
}

export default AuthStateChangedListener
