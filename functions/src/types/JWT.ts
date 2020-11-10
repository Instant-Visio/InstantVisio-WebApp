import { UID } from './uid'

export interface JWTData {
    uid: UID
    iat: number
}

export type JWTKey = string
export type JWTToken = string
