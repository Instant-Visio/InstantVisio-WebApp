import {
    functions,
} from '../firebase/firebase'

export default async (
    setLoading,
    values,
    setSubmission,
    submission,
    setVideoCallId
) => {
    setLoading(true)

    window.scrollTo({
        top: document.querySelector('.form-submission-message').offsetTop,
        behavior: 'smooth',
    })

    try {
        const result = {
            data : {
                id: await functions.newCall({
                    name: values.personName,
                    phone: values.phone,
                    email: values.mail
                })
            }
        }

        if(!result || !result.data || !result.data.name) {
            throw new Error('Room url was not received')
        }

        setVideoCallId(result.data.name)

        setSubmission({
            ...submission,
            success: true,
            fail: false
        })
    } catch (e) {
        console.error(e)
        setSubmission({
            ...submission,
            success: false,
            fail: true
        })
    } finally {
        setLoading(false)
    }
}