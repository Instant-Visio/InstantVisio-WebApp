import React, { useEffect } from 'react'

export const STATE_WAITING = 0
export const STATE_GRANTED = 1
export const STATE_DENIED = 2

export default function useCameraMicrophonePermission(name) {
    const [result, setResult] = React.useState(STATE_WAITING)
    useEffect(() => {
        navigator.getUserMedia(
            {
                video: true,
                audio: true,
            },
            function () {
                setResult(STATE_GRANTED)
            },
            function (err) {
                console.log('err', err)
                setResult(STATE_DENIED)
                alert(
                    'Failed to get camera/microphone permission: ' +
                        JSON.stringify(err)
                )
                // if(err === PERMISSION_DENIED) {
                //     // Explain why you need permission and how to update the permission setting
                // }
            }
        )
    }, [name])
    return result
}
