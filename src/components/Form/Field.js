import React from 'react'
import {Form, InputGroup} from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useField } from 'formik'

export default function Field(props) {
    
    const {label, className, type, name, disabled, title, placeholder, prepend} = props
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
            <InputGroup>
                {prepend && <InputGroup.Prepend>{prepend}</InputGroup.Prepend>}
                <Form.Control
                    type={type}
                    placeholder={placeholder}
                    title={title}
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
            </InputGroup>

        </Form.Group>
    )
}

Field.propTypes = {
    label: PropTypes.string,
    prepend: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
}
