import i18n from './i18n'

export const getLocale = () => {
    const [language] = i18n.language.split('-')
    const [, countryCode] = navigator.language.split('-')

    return {
        language,
        country: language === 'en' ? countryCode : language
    } 
}