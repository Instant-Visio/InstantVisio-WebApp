import React from 'react'
import Dialog from '../../components/Dialog/Dialog'
import { useTranslation } from 'react-i18next'

const ErrorDialog = ({ error, onHide }) => {
    const { t } = useTranslation('videocall')

    return (
        <Dialog show={!!error} title={t('errors.title')} onHide={onHide}>
            <p>{t('errors.desc')}</p>
            <p>{t(`errors.errors.${error.code}`)}</p>
            <pre>{JSON.stringify(error, null, 4)}</pre>
        </Dialog>
    )
}

export default ErrorDialog
