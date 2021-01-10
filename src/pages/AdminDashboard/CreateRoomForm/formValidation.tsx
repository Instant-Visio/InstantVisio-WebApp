import { isDate, setSeconds } from 'date-fns'
import i18n from '../../../i18n/i18n'
import * as Yup from 'yup'

const formatDate = (date: Date): Date => new Date(date.setSeconds(0, 0))

export const validationSchema = Yup.object().shape({
    name: Yup.string().required(i18n.t('required-field')),
    hostName: Yup.string().required(i18n.t('required-field')),
    startAt: Yup.date()
        .nullable()
        .transform((_, originalValue) => {
            if (!originalValue) return null
            const date = !isDate(originalValue)
                ? new Date(originalValue)
                : originalValue

            return formatDate(date)
        })
        //min yup function doesn't work as expected. Use test instead
        .test('startAt', i18n.t('invalid-min-date'), (value: Date) => {
            return !value ? true : value >= formatDate(new Date())
        }),
})
