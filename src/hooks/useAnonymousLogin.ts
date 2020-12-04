import firebase from 'firebase/app'

export default async () => {
    try {
        await firebase.auth().signInAnonymously()
        console.log('User signed up anonymously...')
    } catch (error) {
        console.log(
            `Error anonymous login: ${error.message}, code: ${error.code}`
        )
    }
}
