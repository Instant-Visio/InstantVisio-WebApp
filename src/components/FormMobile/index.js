import React, { useState } from 'react'
import { Formik } from 'formik'
import { Form as BaseForm, Button, Tabs, Tab } from 'react-bootstrap'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Field from '../Form/Field'
import CallError from '../Form/CallError'
import { triggerValidation, format } from '../Form/validation'
import PhoneField from '../Form/PhoneField'
import { getLocale } from '../../i18n/helper'

const BootstrapForm = styled(BaseForm)`
    width: 100%;
`

const FormFields = styled.div``

const FormCard = styled.div`
    background: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.grey};
    padding: ${({ theme }) => `${theme.spacing.XXL} ${theme.spacing.XL}`};
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0.5rem;

    & [role='tab'] {
        outline: none;
    }
`

const SubmitError = styled.p`
    color: ${({ theme }) => theme.color.red};
`

const FormCardHeader = styled.div`
    & p {
        &:first-child {
            text-align: center;
            font-weight: bold;
            font-size: ${({ theme }) => theme.font.XL};
            color: ${({ theme }) => theme.color.orange};
        }
    }
`

const FormSubmit = styled.div`
    text-align: center;
`

export default function FormMobile({ onSubmit, error }) {
    const { t, i18n } = useTranslation('form')
    const { country } = getLocale()
    const tabs = {
        phone: 'phone',
        mail: 'mail',
    }
    const [tab, setTab] = useState(tabs.phone)

    const initialValues = {
        personName: '',
        phone: '',
        mail: '',
        country: country,
    }

    const selectTabOnError = (errors) => {
        if (!errors.phone && errors.mail && tab === tabs.phone) {
            setTab(tabs.mail)
        } else if (!errors.mail && errors.phone && tab === tabs.mail) {
            setTab(tabs.phone)
        }
    }

    const onValidate = async (values) => {
        const errors = await triggerValidation(values, tab, t)
        selectTabOnError(errors)
        return errors
    }

    const handleSubmitForm = (values, { setSubmitting }) => {
        if (onSubmit) {
            onSubmit(
                {
                    ...format(values),
                    lang: i18n.language.split('-')[0],
                },
                setSubmitting
            )
        }
    }

    const onSelectTab = (tab) => setTab(tab)

    return (
        <FormCard>
            <Formik
                initialValues={initialValues}
                validateOnBlur={false}
                validateOnChange={false}
                validate={onValidate}
                onSubmit={handleSubmitForm}>
                {(props) => {
                    /* eslint-disable react/prop-types */
                    const { isSubmitting, handleSubmit } = props
                    return (
                        <BootstrapForm onSubmit={handleSubmit} noValidate>
                            <Tabs activeKey={tab} onSelect={onSelectTab}>
                                <Tab
                                    eventKey={tabs.phone}
                                    title={t('buttons.sms.label')}>
                                    <FormFields>
                                        <PhoneField
                                            showLabel={false}
                                            isSubmitting={isSubmitting}
                                        />
                                    </FormFields>
                                </Tab>
                                <Tab
                                    eventKey={tabs.mail}
                                    title={t('buttons.mail.label')}>
                                    <FormFields>
                                        <Field
                                            name="mail"
                                            type="email"
                                            disabled={isSubmitting}
                                            placeholder={t('mail.placeholder')}
                                            title={t('mail.title')}
                                        />
                                    </FormFields>
                                </Tab>
                            </Tabs>
                            <FormFields>
                                <Field
                                    name="personName"
                                    type="text"
                                    disabled={isSubmitting}
                                    placeholder={t('personName.placeholder')}
                                    title={t('personName.title')}
                                />
                            </FormFields>
                            <FormSubmit>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={classNames({
                                        loading: isSubmitting,
                                    })}>
                                    {t('buttons.submit.label')}
                                </Button>
                            </FormSubmit>
                            {error && (
                                <SubmitError>
                                    <CallError error={error} />
                                </SubmitError>
                            )}
                        </BootstrapForm>
                    )
                }}
            </Formik>
        </FormCard>
    )
}

FormMobile.propTypes = {
    onSubmit: PropTypes.func,
    error: PropTypes.object,
}
