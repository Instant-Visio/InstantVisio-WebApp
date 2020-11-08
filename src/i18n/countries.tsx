import countries from 'i18n-iso-countries'
import { availableLangs } from '../components/Lang/config.json'

for (const lang of availableLangs) {
    import(`i18n-iso-countries/langs/${lang}.json`).then((file) => {
        countries.registerLocale(file)
    })
}
