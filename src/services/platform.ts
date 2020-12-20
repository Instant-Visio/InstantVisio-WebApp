import { isPlatform } from '@ionic/react'
import { Plugins } from '@capacitor/core'
const { App } = Plugins

export const isIos = () => isPlatform('ios')

export const isAndroid = () => isPlatform('android')
