import { isPlatform } from '@ionic/react'

export const isIos = () => isPlatform('ios')

export const isAndroid = () => isPlatform('android')

export const isMobile = () => isIos() || isAndroid()
export const isWeb = () => !isMobile()
