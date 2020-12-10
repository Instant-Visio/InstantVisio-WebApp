import { JWTToken } from '../../types/JWT'

export const SET_TOKEN = 'SET_TOKEN'

export interface Token {
    token: JWTToken
}

export interface SetTokenAction {
    type: typeof SET_TOKEN
    payload: Token
}

export type ActionTypes = SetTokenAction
