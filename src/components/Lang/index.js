import React, { useState } from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import styled from 'styled-components'
import PropTypes from 'prop-types'
//todo get from firebase
import config from './config.json'
import i18n from '../../i18n/i18n'
import Flag from '../Flag'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
    & .btn {
        background: none;
        padding: 0;
        border: none;
        &::after{
            display: none;
        }
        &.dropdown-toggle, &.btn-primary{
            background: none;
            &:focus, &:active{
                background: none;
                box-shadow: none;
            }
        }
    }
`

const Item = styled.div`
    display: flex;
    & :first-child{
        margin-right: ${({theme}) => theme.spacing.XS};
    }
`

export default function Lang({className}){
    
    const {availableLangs, defaultLang} = config
    const [flag, setFlag] = useState(i18n.language || defaultLang)
    const {t} = useTranslation()

    const onSelect = (value) => {
        if (i18n.language !== value) {
            i18n.changeLanguage(value)
            setFlag(value)
        }
    }

    const items = availableLangs.map((value, index) => {
        return (flag !== value && <Dropdown.Item key={`lang-${index}`} eventKey={value}>
            <Item>
                <Flag name={value} /> 
                <span>{t(`lang.${value}`)}</span>
            </Item>
        </Dropdown.Item>)
    })

    return (
        <Wrapper className={className}>
            {availableLangs.length > 1 ? (
                <DropdownButton title={<Flag name={flag} />} onSelect={onSelect}>
                    {items}
                </DropdownButton>
            ) : (<Flag name={flag} />)}
        </Wrapper>
    )
}

Lang.propTypes = {
    className: PropTypes.string
}