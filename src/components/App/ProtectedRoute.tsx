import React from 'react'
import { Route, Redirect } from 'react-router'
import { isLoading as isLoadingSelector } from '../../components/App/userSelector'
import { useSelector } from 'react-redux'

interface ProtectedRouteProps {
    component: React.ElementType
    isAuthorized: boolean
    [x: string]: any
}

const ProtectedRoute = ({
    component: Component,
    isAuthorized,
    ...rest
}: ProtectedRouteProps) => {
    const isLoading = useSelector(isLoadingSelector)

    if (isLoading) return null

    return (
        <Route
            {...rest}
            render={(props) => {
                return isAuthorized ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }}
        />
    )
}

export default ProtectedRoute
