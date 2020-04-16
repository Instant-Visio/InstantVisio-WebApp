import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Country from '../Country'
import Field from './Field'
import { useField } from 'formik'
import { getLocale } from '../../i18n/helper'

const Wrapper = styled.div`
    & .input-group-prepend {
        border: 1px solid #ced4da;
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
    }
`

export default function PhoneField({ isSubmitting }) {
    const { t } = useTranslation('form')
    const { country } = getLocale()

    const [, , helper] = useField('country')
    const { setValue } = helper

    const onCountrySelect = (value) => {
        setValue(value)
    }

    return (
        <Wrapper>
            <Field
                prepend={
                    <Country
                        defaultCountry={country}
                        onSelect={onCountrySelect}
                    />
                }
                name="phone"
                type="tel"
                placeholder={t('phone.placeholder')}
                label={t('phone.label')}
                disabled={isSubmitting}
                title={t('phone.title')}
            />
        </Wrapper>
    )
}

PhoneField.propTypes = {
    isSubmitting: PropTypes.bool,
}
