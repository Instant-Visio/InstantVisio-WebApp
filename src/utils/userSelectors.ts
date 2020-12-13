import { State } from './../reducers/index'

export const getLoginErrorSelector = ({ user }) => user.error
export const getTokenSelector = ({ user }) => user.token
export const isLoadingSelector = ({ user }) => user.isLoading
