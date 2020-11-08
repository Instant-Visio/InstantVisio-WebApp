import { Plugins } from '@capacitor/core'
const { Storage } = Plugins

const lastVideoCallKey = 'last-video-call-key'
export const setLastVideoCallId = async (videoCallId) => {
    return Storage.set({
        key: lastVideoCallKey,
        value: videoCallId,
    })
}

export const getLastVideoCallId = async () => {
    const { value } = await Storage.get({ key: lastVideoCallKey })
    return value
}

export const removeLastVideoCallId = async () => {
    return Storage.remove({ key: lastVideoCallKey })
}
