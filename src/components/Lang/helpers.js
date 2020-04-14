const localStorageName = 'lang'

export const saveLang = (value) => {
    window.localStorage.setItem(localStorageName, value)
}

export const getSavedLang = () => {
    return window.localStorage.getItem(localStorageName)
}