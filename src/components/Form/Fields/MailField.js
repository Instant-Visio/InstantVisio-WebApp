import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Field from '../Field'

export default function MailField({disabled, className}) {
    const {t} = useTranslation('form')
    return (<Field
        name="mail"
        type="mail"
        disabled={disabled}
        placeholder={t('mail.placeholder')} 
        label={t('mail.label')} 
        title={t('mail.title')} 
        className={className}
    />)
    
}

MailField.propTypes = {
    disabled: PropTypes.bool,
    className: PropTypes.string
}
