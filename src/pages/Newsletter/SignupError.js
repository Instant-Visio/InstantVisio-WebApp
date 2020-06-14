import { useTranslation } from 'react-i18next'

const SignupError = (error) => {
    const { t } = useTranslation('form')

    return t('errors.general')
}

export default SignupError
