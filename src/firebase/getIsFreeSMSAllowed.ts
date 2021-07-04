import { db } from './firebase'

export const getIsFreeSMSAllowed = async (): Promise<boolean> => {
    try {
        const documentSnapshot = await db
            .collection('settings')
            .doc('public')
            .get()

        const data = documentSnapshot.data()

        return data ? data.allowFreeSMS : false
    } catch (error) {
        console.error(error)
        return false
    }
}
