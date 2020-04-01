import React from 'react'
import {Form} from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useField } from 'formik'

export default function Field(props) {
    
    const {label, className, type, name, disabled, title, placeholder, value} = props
    const [field, meta, helper] = useField(name)
    const {onChange} = field
    const {error} = meta
    const {setError} = helper
    
    const onFocus = () => {
        if (error) {
            setError('')
        }
    }
    
    return (
        <Form.Group className={className}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                title={title}
                value={value}
                disabled={disabled}
                isInvalid={error}
                onChange={onChange}
                name={name}
                onFocus={onFocus}
            />

            {error &&
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            }
        </Form.Group>
    )
}

Field.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    disabled: PropTypes.bool,
}
