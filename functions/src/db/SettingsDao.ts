import { db } from '../firebase/firebase'
import { COLLECTIONS } from './constants'

const DOCUMENT_ID = 'public'

export interface SettingsData {
    allowFreeSMS: boolean
}

export class SettingsDao {
    public static async isFreeSMSAllowed(): Promise<boolean> {
        const documentSnapshot = await db
            .collection(COLLECTIONS.settings)
            .doc(DOCUMENT_ID)
            .get()

        if (!documentSnapshot.exists) {
            return true
        }

        const data = <SettingsData>documentSnapshot.data()

        if (!data) {
            return true
        }

        return data.allowFreeSMS
    }
}
