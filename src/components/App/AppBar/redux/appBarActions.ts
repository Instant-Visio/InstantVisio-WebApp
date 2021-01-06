import { AppBarActionTypes } from './appBarActionTypes'
import { SHOW_APP_BAR, HIDE_APP_BAR } from './appBarActionTypes'

const show = (): AppBarActionTypes => ({
    type: SHOW_APP_BAR,
})

const hide = (): AppBarActionTypes => ({
    type: HIDE_APP_BAR,
})

const setIsTopbarOffsetDisplayed = (isDisplayed: boolean) => {
    const noTopBarOffsetClass = 'no-topbar-offset'
    const classList = document.getElementsByTagName('ion-content')[0].classList

    if (isDisplayed) {
        classList.remove(noTopBarOffsetClass)
    } else {
        classList.add(noTopBarOffsetClass)
    }
}

export const showAppBar = () => (dispatch) => {
    setIsTopbarOffsetDisplayed(true)
    dispatch(show())
}

export const hideAppBar = () => (dispatch) => {
    setIsTopbarOffsetDisplayed(false)
    dispatch(hide())
}
