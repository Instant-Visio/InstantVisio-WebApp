import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import { useTranslation } from 'react-i18next'

export default function CreateRoomConfirmation() {
    const { t } = useTranslation('dashboard')

    return (
        <>
            <Typography variant="h5" component="h1">
                {t('confirmation.heading', { roomName: 'toto' })}
            </Typography>
            <Paper>{t('confirmation.message', { roomName: 'toto' })}</Paper>
        </>
    )
}
