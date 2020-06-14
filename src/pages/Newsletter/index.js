import styled from 'styled-components'
import React, { useState } from 'react'
import { Formik } from 'formik'
import { Form as BaseForm, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Field from '../../components/Form/Field'
import SignupError from './SignupError'
// import { triggerValidation } from './validation'
import LegalNotice from './LegalNotice'
import AntibotField from './AntibotField'
import PrivacyPolicy from './PrivacyPolicy'
import DefaultLayout from '../../layout/Default'

const BootstrapForm = styled(BaseForm)`
    width: 100%;
`

const FormFields = styled.div`
    & > * {
        margin: 0 0 ${({ theme }) => theme.spacing.XXL};
    }

    &:first-child {
        margin-top: ${({ theme }) => theme.spacing.XXL};
    }
`

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
    margin-bottom: ${({ theme }) => theme.spacing.XXL};
    text-align: center;
`

const NoticeContainer = styled.div`
    width: 90%;
    margin-left: 5%;
    p,
    a {
        font-size: ${({ theme }) => theme.font.S};
    }
`

export default function Newsletter() {
    const { t, i18n } = useTranslation('newsletter')
    const [error, setError] = useState()

    const initialValues = {
        firstName: '',
        lastName: '',
        phone: '',
        mail: '',
    }

    const onValidate = async (values) => {
        // const errors = await triggerValidation(values, tab, t)
        // return errors
    }

    const onSubmit = (data, setSubmitting) => {}

    const handleSubmitForm = (values, { setSubmitting }) => {
        if (onSubmit) {
            onSubmit(
                {
                    ...values,
                    lang: i18n.language.split('-')[0],
                },
                setSubmitting
            )
        }
    }

    return (
        <DefaultLayout title={`${t('page-title')} - Instant Visio`}>
            <FormCard>
                <FormCardHeader>
                    <p>{t('title')}</p>
                    <p>{t('description')}</p>
                </FormCardHeader>
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
                                <FormFields>
                                    <Field
                                        name="mail"
                                        type="email"
                                        disabled={isSubmitting}
                                        placeholder={t('mail.placeholder')}
                                        label={t('mail.label')}
                                        title={t('mail.title')}
                                    />
                                </FormFields>

                                <FormFields>
                                    <Field
                                        name="firstName"
                                        type="text"
                                        disabled={isSubmitting}
                                        placeholder={t('firstName.placeholder')}
                                        label={t('firstName.label')}
                                        title={t('firstName.title')}
                                    />
                                </FormFields>
                                <FormFields>
                                    <Field
                                        name="lastName"
                                        type="text"
                                        disabled={isSubmitting}
                                        placeholder={t('lastName.placeholder')}
                                        label={t('lastName.label')}
                                        title={t('lastName.title')}
                                    />
                                </FormFields>

                                <FormFields>
                                    <Form.Check
                                        type="checkbox"
                                        label="J'accepte de recevoir (et seulement cela): la lettre et les informations d'Instant Visio"
                                    />
                                </FormFields>
                                <AntibotField />

                                <NoticeContainer>
                                    <PrivacyPolicy />
                                    <LegalNotice />
                                </NoticeContainer>
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
                                        <SignupError error={error} />
                                    </SubmitError>
                                )}
                            </BootstrapForm>
                        )
                    }}
                </Formik>
            </FormCard>
        </DefaultLayout>
    )
}

Newsletter.propTypes = {
    onSubmit: PropTypes.func,
    error: PropTypes.object,
}

{
    /* <form
    action="https://instantvisio.us19.list-manage.com/subscribe/post?u=54f72daf5d7948c23e68e8acb&amp;id=b8e26c1a9a"
    method="post"
    novalidate>
</form> */
}
