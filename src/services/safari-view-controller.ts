import { SafariViewController } from '@ionic-native/safari-view-controller'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { isMobile } from './platform'

const openWithNativeBrowser = async (url: string) => {
    InAppBrowser.create(url, '_system')
}

export const openWithSafariViewController = async (url: string) => {
    const isAvailable = await SafariViewController.isAvailable()
    if (isAvailable) {
        SafariViewController.show({
            url,
            hidden: false,
            animated: false,
            transition: 'curl',
            enterReaderModeIfAvailable: true,
            tintColor: '#ff0000',
        }).subscribe(
            (result: any) => console.log(result.event),
            (error: any) => console.error(error)
        )
    } else {
        openWithNativeBrowser(url)
    }
}

export const openPremiumVideoCall = async (roomUrl: string) => {
    console.log(`Link to open: ${roomUrl}`)
    await openWithSafariViewController(roomUrl)
}
