import { useTranslation } from 'react-i18next'

export interface Error {
    code: string
    message: string
}

const CallError = (error: Error) => {
    const { t } = useTranslation('form')

    const e = error
    if (e && e.code) {
        switch (e.code) {
            case 'resource-exhausted':
                return e.message === '402'
                    ? t('errors.quotaSMS')
                    : t('errors.resourceExausted')
            default:
                return t('errors.general')
        }
    }

    return t('errors.general')
}

export default CallError
