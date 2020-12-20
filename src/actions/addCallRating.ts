import { functions } from '../firebase/firebase'

export const addCallRating = async (rating) => {
    try {
        return await functions.callRating({
            rating,
        })
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}
