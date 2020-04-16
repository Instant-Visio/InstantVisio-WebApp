import isoCountries from 'i18n-iso-countries'
import i18n from '../../i18n/i18n'

export default function getCountries(selectedCountries){
    
    const {language, options} = i18n
    let translatedCountries = isoCountries.getNames(language)

    if (!Object.entries(translatedCountries).length){
        translatedCountries = isoCountries.getNames(options.fallbackLng[0])
    }

    let countries = Object.entries(translatedCountries)
    
    if (selectedCountries){
        const regExp = new RegExp(selectedCountries.join('|'), 'i')
        const filteredCountries = countries.filter(([code]) => regExp.test(code)) 
        if (filteredCountries.length){
            countries = filteredCountries
        }
    }

    countries.sort((a, b) => a[1].localeCompare(b[1]))

    return countries

}