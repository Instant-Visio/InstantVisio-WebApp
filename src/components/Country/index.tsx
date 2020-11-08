import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { FormControl } from 'react-bootstrap'
import styled from 'styled-components'
import getCountries from './countries'
import Flag from '../Flag'
import BaseArrow from '../Arrow'
import { BaseArrowProps } from '../Arrow'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 60px;
    justify-content: space-around;
    & .form-control {
        position: absolute;
        opacity: 0;
        z-index: 1;
    }
`

const Arrow = styled(BaseArrow)<BaseArrowProps>`
    margin-bottom: 0.125rem;
`

const renderOption = ([code, country]: string[], index) => (
    <option key={`country-${index}`} value={code}>
        {country}
    </option>
)

function Country({ defaultCountry, onSelect, className }) {
    const countries = useMemo(() => getCountries(), [])

    const [country, setCountry] = useState('')

    useEffect(() => {
        const [[countryCode]] = countries
        setCountry(defaultCountry || countryCode)
    }, [defaultCountry, countries])

    const handlerSelect = (event) => {
        event.preventDefault()
        const {
            target: { value },
        } = event
        setCountry(value)
        if (onSelect) {
            onSelect(value)
        }
    }

    return (
        <Wrapper className={className}>
            <Flag name={country} />
            {countries.length > 1 && (
                <>
                    <FormControl
                        as="select"
                        onChange={handlerSelect}
                        value={country}>
                        {countries.map(renderOption)}
                    </FormControl>
                    <Arrow width={8} height={8} />
                </>
            )}
        </Wrapper>
    )
}

Country.propTypes = {
    onSelect: PropTypes.func,
    defaultCountry: PropTypes.string,
    className: PropTypes.string,
}

export default Country
