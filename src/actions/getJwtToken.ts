import { functions } from '../firebase/firebase'

export const getJwtToken = async (uid) => {
    try {
        const result = await functions.getToken({
            uid,
        })

        console.log(`Jwt token fetched ${result}`)
        const jwtToken = result?.data
        if (!jwtToken) {
            throw new Error('JwtToken could not be fetched')
        }

        return jwtToken
    } catch (e) {
        console.error(e)
        throw e
    }
}
