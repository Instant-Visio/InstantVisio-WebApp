import React from 'react'
import PropTypes from 'prop-types'
import 'flag-icon-css/sass/flag-icon.scss'

export default function Flag({name}){
    return (<span className={`flag-icon flag-icon-${name.toLowerCase()}`}></span>)
}

Flag.propTypes = {
    name: PropTypes.string.isRequired,
}
