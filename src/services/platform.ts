import { isPlatform, getPlatforms } from '@ionic/react'

export const isIos = () => isPlatform('ios')

export const isAndroid = () => isPlatform('android')

export const isAndroidAndWeb = () => !getPlatforms().some(r=>["desktop","electron","pwa"].indexOf(r) >= 0);

export const isMobile = () => isIos() || isAndroid()
export const isWeb = () => !isMobile()
