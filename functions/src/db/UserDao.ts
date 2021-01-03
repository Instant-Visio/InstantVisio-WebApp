import { UID } from '../types/uid'
import { JWTToken } from '../types/JWT'
import { db, documentId, serverTimestamp } from '../firebase/firebase'
import { COLLECTIONS } from './constants'
import {
    NoAvailableTokenError,
    NotFoundError,
    UserNotFoundError,
} from '../api/errors/HttpError'
import { User } from '../types/User'
import admin from 'firebase-admin'
import FieldValue = admin.firestore.FieldValue
import { GroupId } from '../types/Group'
import { GroupDao } from './GroupDao'

export class UserDao {
    public static async get(userId: UID): Promise<User> {
        const userDocumentSnapshot = await db
            .collection('users')
            .doc(userId)
            .get()

        if (!userDocumentSnapshot?.exists) {
            throw new UserNotFoundError()
        }
        return <User>{
            id: userId,
            ...userDocumentSnapshot.data(),
        }
    }

    public static async update(userId: UID, data: object): Promise<void> {
        await db
            .collection(COLLECTIONS.users)
            .doc(userId)
            .set(
                {
                    ...data,
                    updatedAt: serverTimestamp(),
                },
                { merge: true }
            )
    }

    public static async addToken(userId: UID, token: JWTToken): Promise<void> {
        await UserDao.update(userId, {
            tokens: {
                [token]: {
                    valid: true,
                    createdAt: serverTimestamp(),
                },
            },
        })
    }

    public static async getFirstValidToken(
        userId: UID
    ): Promise<JWTToken | null> {
        const userData = await UserDao.get(userId)

        if (userData.tokens) {
            const validTokens = Object.keys(userData.tokens).filter(
                (token) => userData.tokens[token].valid
            )

            if (validTokens.length > 0) {
                return validTokens[0]
            }
        }

        throw new NoAvailableTokenError()
    }

    public static async isTokenValid(
        userId: UID,
        token: JWTToken
    ): Promise<boolean> {
        try {
            const user = await UserDao.get(userId)

            return user.tokens && user.tokens[token] && user.tokens[token].valid
        } catch (error) {
            if (error instanceof NotFoundError) {
                return false
            } else {
                throw error
            }
        }
    }

    public static async updateUsage(
        userId: UID,
        usage: {
            participantSeconds?: FieldValue
            sentEmails?: FieldValue
            sentSMSs?: FieldValue
            sentPushs?: FieldValue
        }
    ): Promise<void> {
        const month = new Date().getMonth() + 1
        await UserDao.update(userId, {
            usage: usage,
            subscription: {
                [month]: {
                    usage,
                },
            },
            updatedAt: serverTimestamp(),
        })
    }

    public static async getRegistrationTokensForGroup(groupId: GroupId) {
        const group = await GroupDao.get(groupId)
        const querySnapshots = await db
            .collection(COLLECTIONS.users)
            .where(documentId(), 'in', group.members)
            .get()

        return querySnapshots.docs.reduce((acc: string[], userDoc) => {
            const { registrationTokens } = userDoc.data()
            return acc.concat(registrationTokens)
        }, [])
    }
}

export interface UserEditData {
    name?: string
    subscription?: {
        isActive: boolean
        isQuotaReached: boolean
        type: string
        quotas?: {
            sms: number
            email: number
            push: number
            minutes: number
        }
    }
    usage?: {
        sentSMSs: number
        sentEmails: number
        sentPushs: number
    }
}
