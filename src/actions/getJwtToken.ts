import { functions } from '../firebase/firebase'
import { UID } from '../../types/uid'
import { JWTToken } from '../../types/JWT'

const RETRY = {
    number: 4,
    interval: 300,
}

async function tryAtMost(promise, maxRetries, retryInterval) {
    let retriesNumber = 0
    while (retriesNumber <= maxRetries) {
        try {
            const result = await promise
            return result
        } catch (err) {
            retriesNumber++
            await new Promise((resolve) => {
                setTimeout(function () {
                    resolve(true)
                }, retryInterval)
            })
        }
    }

    throw new Error()
}

export const getJwtToken = async (uid: UID): Promise<JWTToken> => {
    try {
        const getTokenPromise = functions.getToken({
            uid,
        })

        /*
            tryAtMost is needed because before a token can exist, firebase functions hook
            need to successfully complete execution. Since this call is made right after login,
            the hook might have not finished executing yet
        */
        const result = await tryAtMost(
            getTokenPromise,
            RETRY.number,
            RETRY.interval
        )

        const jwtToken: JWTToken = result?.data.token
        if (!jwtToken) {
            throw new Error('JwtToken could not be fetched')
        }

        return jwtToken
    } catch (e) {
        console.error(e)
        throw e
    }
}
