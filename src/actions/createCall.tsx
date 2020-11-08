import { functions } from '../firebase/firebase'

export const createCall = async (values) => {
    try {
        const result = await functions.newCall({
            name: values.personName,
            phone: values.phone,
            email: values.mail,
            lang: values.lang,
            platform: 'web',
        })

        if (!result || !result.data || !result.data.name) {
            throw new Error('Room name was not received')
        }

        return Promise.resolve(result.data.name)
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}
