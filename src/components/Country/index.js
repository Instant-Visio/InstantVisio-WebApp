import React, { useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import {FormControl} from 'react-bootstrap'
import styled from 'styled-components'
import i18n from '../../i18n/i18n'
import Flag from '../Flag'
import color from 'color'
import isoCountries from 'i18n-iso-countries'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 60px;
    justify-content: space-around;
    & .form-control{
        position: absolute;
        opacity: 0;
        z-index: 1;
    }
`

const Arrow = styled.div`
    color: ${({theme}) => color(theme.color.grey).lighten(1.5).toString()};
`

const renderOption = ([code, country], index) => (
    <option key={`country-${index}`} value={code}>{country}</option>
)

function Country({defaultCountry, selectedCountries, onSelect, className}){
    const {language, options} = i18n
    const countries = useMemo(() => {
        let translatedCountries = isoCountries.getNames(language)

        if (!Object.entries(translatedCountries).length){
            translatedCountries = isoCountries.getNames(options.fallbackLng[0])
        }

        let countriesList = Object.entries(translatedCountries)
        if (selectedCountries.length){
            countriesList = countriesList.filter(([code]) => selectedCountries.includes(code))
        }

        countriesList.sort((a, b) => a[1].localeCompare(b[1]))

        return countriesList
    }, [language, selectedCountries, options.fallbackLng])

    const [country, setCountry] = useState('')

    useEffect(() => {
        const firstCountryList =  countries[0][0]
        setCountry(defaultCountry === 'en' ? firstCountryList : defaultCountry || firstCountryList )
    },[defaultCountry, countries])

    const handlerSelect = (event) => {
        event.preventDefault()
        const {target: {value}} = event
        setCountry(value)
        if (onSelect){
            onSelect(value)
        }
    }
    
    return (
        <Wrapper className={className}>
            <Flag name={country} />
            {countries.length > 1 &&
                <FormControl as="select" onChange={handlerSelect} value={country}>
                    {countries.map(renderOption)}
                </FormControl>
            }
            <Arrow>&#x2BC6;</Arrow>
        </Wrapper>
    )
}

Country.defaultProps = {
    selectedCountries: []
}

Country.propTypes = {
    onSelect: PropTypes.func,
    defaultCountry: PropTypes.string,
    className: PropTypes.string,
    selectedCountries: PropTypes.arrayOf(PropTypes.string)
}

export default Country