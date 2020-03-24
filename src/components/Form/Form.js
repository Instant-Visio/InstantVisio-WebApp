import React from 'react'
import {Formik} from 'formik'
import {Form as BootstrapForm, Button} from 'react-bootstrap'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import schema from './schema'
import './style.css'
import Field from './Field'

const initialValues = {
    personName: '',
    phone: '',
    mail: '',
}

const validate = (values) => {
    const errors = {}
    const {mail, phone} = values

    if (!mail && !phone) {
        errors.contact = 'Le numéro de téléphone ou l\'adresse e-mail doit être renseigné-e'
    }

    return errors
}

export default function Form({onSubmit, isSending}) {

    const handleSubmitForm = (values) => {
        if (onSubmit) {
            onSubmit(values)
        }
    }
    return (
        /* eslint-disable react/prop-types */
        <Formik validationSchema={schema} validate={validate} initialValues={initialValues} onSubmit={handleSubmitForm}>
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                } = props
                return (

                    <BootstrapForm onSubmit={handleSubmit} className="form" noValidate>
                        <Field
                            label="Votre nom"
                            type="text"
                            name="personName"
                            placeholder="Ex. : Laure"
                            title="Veuillez saisir votre nom"
                            value={values.personName}
                            onChange={handleChange}
                            disabled={isSending}
                            onBlur={handleBlur}
                            touched={touched.personName}
                            error={errors.personName}
                        />
                        <div className="error-field">
                            {(touched.mail || touched.phone) && errors.contact}
                        </div>
                        <Field
                            label="Numéro de téléphone de votre proche (optionnel si e-mail renseigné)"
                            type="phone"
                            name="phone"
                            onBlur={handleBlur}
                            placeholder="Ex. : 0706050403"
                            title="Veuillez saisir le numéro de téléphone de votre proche"
                            value={values.phone}
                            disabled={isSending}
                            touched={touched.phone}
                            error={errors.phone}
                            onChange={handleChange}
                        />
                        <Field
                            label="E-mail de votre proche (optionnel si téléphone renseigné)"
                            type="email"
                            name="mail"
                            onBlur={handleBlur}
                            placeholder="Ex. : thomas.durand@gmail.com"
                            title="Veuillez saisir l'adresse e-mail de votre proche"
                            value={values.mail}
                            disabled={isSending}
                            onChange={handleChange}
                            touched={touched.mail}
                            error={errors.mail}
                        />
                        <Button
                            variant="success"
                            type="submit"
                            disabled={isSending}
                            className={classNames({loading: isSending})}>
                            Joindre mon proche
                        </Button>
                    </BootstrapForm>
                )
            }}
        </Formik>
    )
}

Form.propTypes = {
    onSubmit: PropTypes.func,
    isSending: PropTypes.bool
}
