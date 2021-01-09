import { format } from 'date-fns'
import i18n from '../../../i18n/i18n'

import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
    name: Yup.string().required(i18n.t('required-field')),
    hostName: Yup.string().required(i18n.t('required-field')),
    startAt: Yup.date()
        .test('startAt', i18n.t('invalid-date'), (value) => {
            //use custom format instead timestamp and isPast (date-fns). It could be have small difference between datepicker date (seconds) and now
            const dateFormat = 'yyyy-mm-ddhh:mm'
            const isValid =
                format(value, dateFormat) >= format(new Date(), dateFormat)
            return isValid
        })
        .nullable(),
})
