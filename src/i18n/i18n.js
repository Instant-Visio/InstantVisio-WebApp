import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-xhr-backend'

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: 'fr',
        fallbackLng: 'en',
        defaultNS: ['common'],
        debug: process.env.NODE_ENV === 'development',
    })


export default i18n