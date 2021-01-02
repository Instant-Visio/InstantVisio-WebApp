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

export const openPremiumVideoCall = async (
    history: any,
    roomName: string = 'test',
    password: string = 'admin'
) => {
    const linkToVideoCall = `/premium-video/room/${roomName}?passcode=${password}`
    if (isMobile()) {
        const webAppUrl = process.env.REACT_APP_API_URL?.replace('/api/v1', '')
        await openWithSafariViewController(`${webAppUrl}${linkToVideoCall}`)
    } else {
        history.push(linkToVideoCall)
    }
}
