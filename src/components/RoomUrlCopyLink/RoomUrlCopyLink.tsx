import React from 'react'
import { useTranslation } from 'react-i18next'
import { preventDefault } from '../../pages/AdminDashboard/UserDetails'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useDispatch } from 'react-redux'
import { showSuccessMessage } from '../App/Snackbar/snackbarActions'
import Link from '@material-ui/core/Link'

const RoomUrlCopyLink = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation('dashboard')
    const roomUrl = window.sessionStorage.getItem('roomUrl')

    return (
        <CopyToClipboard
            text={roomUrl}
            onCopy={() =>
                dispatch(showSuccessMessage(t('confirmation.link-copied')))
            }>
            <Link 
                href="#"
                onClick={preventDefault}
                variant="body2">
                {t('click-to-copy-link')}
            </Link>
        </CopyToClipboard>
    )
}

export default RoomUrlCopyLink
