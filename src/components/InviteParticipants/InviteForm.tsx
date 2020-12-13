import React from 'react'
import { Formik } from 'formik'
import { Form as BaseForm, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import Field from '../Form/Field'
import CallError, { Error } from '../Form/CallError'

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
    Button {
        margin: ${({ theme }) => theme.spacing.XXS};
    }
`

export default function InviteForm({ onSubmit, error }) {
    const { t } = useTranslation('add-participants-form')

    const initialValues = {
        participantAddresses: [],
    }

    const onValidate = async (values) => {
        // TODO add validation logic
        console.log('Values: ', values)
        return true
    }

    return (
        <>
            <FormCardHeader>
                <p>{t('title')}</p>
                <p>{t('description')}</p>
            </FormCardHeader>
            <Formik
                initialValues={initialValues}
                validateOnBlur={false}
                validateOnChange={false}
                validate={onValidate}
                onSubmit={onSubmit}>
                {(props) => {
                    /* eslint-disable react/prop-types */
                    const { isSubmitting, handleSubmit } = props
                    return (
                        <BootstrapForm onSubmit={handleSubmit} noValidate>
                            <FormFields>
                                <Field
                                    name="participantAddresses"
                                    type="text"
                                    disabled={isSubmitting}
                                    placeholder={t('placeholder')}
                                    label={t('notice')}
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
                                    {t('buttons.cancel')}
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={classNames({
                                        loading: isSubmitting,
                                    })}>
                                    {t('buttons.submit')}
                                </Button>
                            </FormSubmit>
                            {error && (
                                <SubmitError>{CallError(error, t)}</SubmitError>
                            )}
                        </BootstrapForm>
                    )
                }}
            </Formik>
        </>
    )
}
