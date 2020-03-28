import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Field from '../Field'

export default function NameField({disabled}) {
    const {t} = useTranslation('form')
    return (<Field
        name="personName"
        type="text" 
        disabled={disabled}
        placeholder={t('personName.placeholder')} 
        label={t('personName.label')} 
        title={t('personName.title')} 
    />)
    
}

NameField.propTypes = {
    disabled: PropTypes.bool,
}
