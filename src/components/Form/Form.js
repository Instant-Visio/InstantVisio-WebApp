import React from 'react'
import {Formik} from 'formik'
import {Form as BootstrapForm, Button} from 'react-bootstrap'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import schema from './schema'
import './Form.css'
import Field from './Field'

const initialValues = {
    personName: '',
    otherPersonName: '',
    phone: '',
    mail: '',
}

export default function Form({onSubmit, isSending}) {

    const handleSubmitForm = (values) => {
        if (onSubmit) {
            onSubmit(values)
        }
    }
    return (
        /* eslint-disable react/prop-types */
        <Formik validationSchema={schema} initialValues={initialValues} onSubmit={handleSubmitForm}>
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
                            label="Numéro de téléphone de votre proche"
                            type="otherPersonName"
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
                            label="Quel est votre nom ?"
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
                        <Button
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
