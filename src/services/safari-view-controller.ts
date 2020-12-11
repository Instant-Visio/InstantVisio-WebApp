import { SafariViewController } from '@ionic-native/safari-view-controller'
import { InAppBrowser } from '@ionic-native/in-app-browser'

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
            (result: any) => {
                if (result.event === 'opened') console.log('Opened')
                else if (result.event === 'loaded') console.log('Loaded')
                else if (result.event === 'closed') console.log('Closed')
            },
            (error: any) => console.error(error)
        )
    } else {
        openWithNativeBrowser(url)
    }
}
