import * as Yup from 'yup'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

const schema = Yup.object().shape({
    personName: Yup.string().trim().required('personName.errors.required'),
    contact: Yup.object().shape(
        {
            tab: Yup.ref('$tab'),
            mail: Yup.string()
                .trim()
                .email('mail.errors.invalid')
                .when('tab', {
                    is: (value) => value === 'mail',
                    then: Yup.string().required('mail.errors.required'),
                })
                .when('phone', {
                    is: true,
                    then: (fieldSchema) => fieldSchema.required(),
                }),
            phone: Yup.string()
                .trim()
                .when('tab', {
                    is: (value) => value === 'phone',
                    then: Yup.string().required('phone.errors.required'),
                })
                .when('mail', {
                    is: true,
                    then: (fieldSchema) => fieldSchema.required(),
                })
                .test('is-valid', 'phone.errors.invalid', (value) => {
                    if (!value) {
                        return true
                    }

                    value = value.replace(/ /g, '')
                    return value.match(/(\d+){6,}/gi)
                }),
        },
        ['phone', 'mail']
    ),
})

export const triggerValidation = async (values, tab, translator) => {
    let { phone, mail, personName } = values
    const errors = {}

    Object.keys(values).map((k) => (values[k] = values[k].trim()))

    try {
        await schema.validate(
            { contact: { phone, mail }, personName },
            { abortEarly: false, context: { tab } }
        )
    } catch ({ inner }) {
        for (let { path, message } of inner) {
            path = path.split('.').reverse().shift() //if it's object
            errors[path] = translator(message)
        }
    }

    return errors
}

export const format = (values) => {
    const { phone, country } = values

    if (phone) {
        const phoneNumber = parsePhoneNumberFromString(
            phone.replace(/ /g, ''),
            country
        )
        return { ...values, phone: phoneNumber.formatInternational() }
    }

    return values
}

export default triggerValidation
