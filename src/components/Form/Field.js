import React from 'react'
import {Form} from 'react-bootstrap'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useField } from 'formik'

export default function Field(props) {

    const [field, meta] = useField(props.name)
    const {touched, error} = meta
    const {value, onChange, onBlur} = field

    const {label, className, type, name, disabled, title, placeholder} = props
    
    return (
        <Form.Group className={className}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                name={name}
                placeholder={placeholder}
                title={title}
                value={value}
                disabled={disabled}
                onChange={onChange}
                onBlur={onBlur}
                className={classNames({'is-invalid': touched && error}, {'is-valid': touched && !error})}
            />
            {touched && error &&
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            }
        </Form.Group>
    )
}

Field.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    disabled: PropTypes.bool,
    error: PropTypes.string,
    touched: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
}
