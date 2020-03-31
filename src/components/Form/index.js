import React, { useState } from 'react'
import {Formik} from 'formik'
import {Form as BootstrapForm, Button} from 'react-bootstrap'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import schema from './schema'
import {MailField, PhoneField, NameField} from './Fields'

const initialValues = {
    personName: '',
    phone: '',
    mail: '',
}

const isStepPhone = (step) => step === 'phone'

const FormFields = styled.div`
    & > * {
        margin: 0 0 ${({theme}) => theme.spacing.XXL};
    }
`

const FormCard = styled.div`
    background: ${({theme}) => theme.color.white};
    color: ${({theme}) => theme.color.grey};
    padding: ${({theme}) => `${theme.spacing.XXL} ${theme.spacing.XL}`};
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0.5rem;

    .sms-disabled {
        color: #7f8ca6;
        font-style: italic;
    }
    
    & form {
        width: 100%;

        & .hide {
            display: none;
        }
    }
`

const SubmitError = styled.p`
    color: ${({theme}) => theme.color.red};
`

const FormCardHeader = styled.div`
    & p{
        &:first-child{
            text-align: center;
            font-weight: bold;
            font-size: ${({theme}) => theme.font.XL};
            color: ${({theme}) => theme.color.orange};
        }
    }
`

const FormSubmit = styled.div`
    text-align: center;
`

const ButtonChoices = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    button {
        text-transform: capitalize;
        font-size: 1.125rem; 
    }
`

export default function Form({onSubmit, errorSending}) {
    const [step, setStep] = useState('phone')
    const { t } = useTranslation('form')

    const handleSubmitForm = (values, {setSubmitting}) => {
        if (onSubmit) {
            onSubmit(values, setSubmitting)
        }
    }

    return (
        <FormCard>
            <FormCardHeader>
                <p>{t('title')}</p>
                {/* <p>{t('description')}</p> */}
            </FormCardHeader>
            <ButtonChoices>
                {/* <Button disabled={isStepPhone(step)} onClick={() => setStep('phone')}>{t('buttons.sms.label')}</Button> */}
                {/* <Button disabled={!isStepPhone(step)} onClick={() => setStep('mail')}>{t('buttons.mail.label')}</Button> */}
                <p className="sms-disabled">L'option sms est momentanément désactivée. Elle sera rétablie le 1er avril 2020.</p>
            </ButtonChoices>
            <Formik validationSchema={schema} initialValues={initialValues} onSubmit={handleSubmitForm}>
                {props => {
                /* eslint-disable react/prop-types */
                    const {isSubmitting, isValid, handleSubmit, dirty} = props
                    return (

                        <BootstrapForm onSubmit={handleSubmit} noValidate autoComplete='off'>
                            <FormFields>
                                {/* <PhoneField disabled={isSubmitting} className={classNames({'hide': !isStepPhone(step)})} /> */}
                                <MailField disabled={isSubmitting} /* className={classNames({'hide': isStepPhone(step)})} */ />
                                <NameField disabled={isSubmitting} />
                            </FormFields>
                            <FormSubmit>
                                <Button
                                    type="submit"
                                    disabled={!(isValid && dirty) || isSubmitting}
                                    className={classNames({loading: isSubmitting})}>
                                    {t('buttons.submit.label')}
                                </Button>
                            </FormSubmit>
                            {errorSending &&
                                <SubmitError>{t('errors.submit')}</SubmitError>
                            }
                        </BootstrapForm>
                    )
                }}
            </Formik>
        </FormCard>
    )
}

Form.propTypes = {
    onSubmit: PropTypes.func,
    errorSending: PropTypes.bool,
}
