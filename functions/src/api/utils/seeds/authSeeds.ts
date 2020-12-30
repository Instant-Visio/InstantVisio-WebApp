import { UID } from '../../../types/uid'
import fetch from 'node-fetch'
import { InternalServerError } from '../../errors/HttpError'

export interface UserSeed {
    email: string
    password: string
}

export const seedAuth = async (
    url: string,
    users: UserSeed[]
): Promise<{
    premiumUser: UID
    freeUser: UID
    overQuotaUser: UID
}> => {
    // delete everything first
    const response = await fetch(
        `http://${url}/emulator/v1/projects/instantvisio-dev/accounts?key=some-secret-key`,
        {
            method: 'DELETE',
            headers: {
                Authorization:
                    'Bearer ya29.AHES6ZRVmB7fkLtd1XTmq6mo0S1wqZZi3-Lh_s-6Uw7p8vtgSwg', // fake from Firebase test, only format useful
            },
        }
    )

    if (!response.ok) {
        const json = await response.json()
        console.error(json)
        throw new InternalServerError('Auth clear failed')
    }

    try {
        const userIds: UID[] = []
        for (const user of users) {
            const response2 = await fetch(
                `http://${url}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=some-secret-key`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: user.email,
                        password: user.password,
                    }),
                }
            )
            const respJson = await response2.json()
            if (response2.ok) {
                userIds.push(respJson.localId)
            } else {
                throw new InternalServerError('Auth seed failed partially')
            }
        }
        return {
            premiumUser: userIds[0],
            freeUser: userIds[1],
            overQuotaUser: userIds[2],
        }
    } catch (error) {
        console.log(error)
        throw error
    }
    throw new InternalServerError('Auth seed failed partially')
}
