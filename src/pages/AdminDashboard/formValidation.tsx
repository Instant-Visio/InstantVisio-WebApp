import * as Yup from 'yup'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

export const validationSchema = Yup.object().shape({
    roomName: Yup.string().required('required'),
    hostName: Yup.string(),
})
