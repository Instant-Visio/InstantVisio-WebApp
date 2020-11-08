import isoCountries from 'i18n-iso-countries'
import i18n from '../../i18n/i18n'

export default function getCountries() {
    const { language, options } = i18n
    let translatedCountries = isoCountries.getNames(language)

    if (!Object.entries(translatedCountries).length) {
        const { fallbackLng } = options
        if (fallbackLng) {
            translatedCountries = isoCountries.getNames(fallbackLng[0])
        }
    }

    let countries = Object.entries(translatedCountries).map((country) => {
        const newArray = [...country]
        newArray[0] = newArray[0].toLowerCase()
        return newArray
    })

    countries.sort((a, b) => a[1].localeCompare(b[1]))

    return countries
}
