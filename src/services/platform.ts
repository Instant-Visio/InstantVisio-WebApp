import { isPlatform, getPlatforms } from '@ionic/react'

export const isIos = () => isPlatform('ios')

export const isAndroid = () => isPlatform('android')

export const isAndroidAndWeb = () => !getPlatforms().some(r=>["ios","ipad","iphone","phablet","tablet","cordova","capacitor","electron","pwa" ,"mobile","mobileweb","hybrid"].indexOf(r) >= 0);

export const isMobile = () => isIos() || isAndroid()
export const isWeb = () => !isMobile()
