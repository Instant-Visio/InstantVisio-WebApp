import React from 'react'
import {Form} from 'react-bootstrap'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export default function Field(props) {

    const {label, type, name, title, placeholder, onBlur, value, disabled, touched, error, onChange} = props
    return (
        <Form.Group>
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
                className={classNames({'is-invalid': touched && error})}
            />
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>

        </Form.Group>
    )
}

Field.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
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
