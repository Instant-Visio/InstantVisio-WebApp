import React, { useEffect } from 'react'
import {
    STATE_DENIED,
    STATE_GRANTED,
    STATE_WAITING,
} from 'src/pages/VideoCall/permissions/PermissionConstants'

export default function useCameraMicrophonePermission(name) {
    const [result, setResult] = React.useState(STATE_WAITING)
    useEffect(() => {
        const constraints = {
            video: true,
            audio: true,
        }

        navigator.getUserMedia &&
            navigator.getUserMedia(
                constraints,
                function () {
                    setResult(STATE_GRANTED)
                },
                function (err) {
                    console.log('err', err)
                    setResult(STATE_DENIED)
                }
            )

        navigator.mediaDevices.getUserMedia &&
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(() => {
                    setResult(STATE_GRANTED)
                })
                .catch((error) => {
                    console.log(error)
                    setResult(STATE_DENIED)
                })
    }, [name])
    return result
}
