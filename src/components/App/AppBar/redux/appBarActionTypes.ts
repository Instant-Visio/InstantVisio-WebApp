export const SHOW_APP_BAR = 'SHOW_APP_BAR'
export const HIDE_APP_BAR = 'HIDE_APP_BAR'

interface ShowAppBarAction {
    type: typeof SHOW_APP_BAR
}

interface HideAppBarAction {
    type: typeof HIDE_APP_BAR
}

export type AppBarActionTypes = HideAppBarAction | ShowAppBarAction
