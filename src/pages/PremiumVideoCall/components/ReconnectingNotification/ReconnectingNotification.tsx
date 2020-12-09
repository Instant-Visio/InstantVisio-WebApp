/**
 * This file was modified by
 * Mattia Primavera <sconqua@gmail.com>
 */

import React from 'react'
import Snackbar from '../Snackbar/Snackbar'
import useRoomState from '../../hooks/useRoomState/useRoomState'

export default function ReconnectingNotification() {
    const roomState = useRoomState()

    return (
        <Snackbar
            variant="error"
            headline="Connection Lost:"
            message="Reconnecting to room..."
            open={roomState === 'reconnecting'}
        />
    )
}
