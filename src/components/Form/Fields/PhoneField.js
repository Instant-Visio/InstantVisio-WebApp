import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Field from '../Field'

export default function PhoneField({disabled, className}) {
    const {t} = useTranslation('form')
    return (<Field
        name="phone"
        type="text"
        placeholder={t('phone.placeholder')} 
        label={t('phone.label')} 
        disabled={disabled}
        title={t('phone.title')} 
        className={className}
    />)  
}

PhoneField.propTypes = {
    disabled: PropTypes.bool,
    className: PropTypes.string
}
