import React from 'react'
import { Route, Redirect } from 'react-router'
import { getTokenSelector, isLoadingSelector } from '../../utils/userSelectors'
import { useSelector } from 'react-redux'
import { authInstance } from '../../firebase/firebase'

interface ProtectedRouteProps {
    component: React.ElementType
    [x: string]: any
}

const ProtectedRoute = ({
    component: Component,
    ...rest
}: ProtectedRouteProps) => {
    const isAnonymous = authInstance.currentUser?.isAnonymous
    const token = useSelector(getTokenSelector)
    const isLoading = useSelector(isLoadingSelector)

    if (isLoading) return null

    return (
        <Route
            {...rest}
            render={(props) => {
                return !isAnonymous && token ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }}
        />
    )
}

export default ProtectedRoute
