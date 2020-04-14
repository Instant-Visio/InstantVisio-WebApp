import React from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import styled from 'styled-components'
import PropTypes from 'prop-types'
//todo get from firebase
import config from './config.json'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
    & .btn {
        background: none;
        padding: 0;
        border: none;
        font-weight: bold;
        color: ${({theme}) => theme.color.logoGrey};
        &.dropdown-toggle, &.btn-primary{
            background: none;
            &:focus, &:active{
                color: ${({theme}) => theme.color.logoGrey};
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
    
    const {availableLangs} = config
    const {t, i18n} = useTranslation()
    const {language} = i18n

    const onSelect = (value) => {
        if (i18n.language !== value) {
            i18n.changeLanguage(value)
        }
    }

    const renderTitle = (value) => <span>{t(`lang.${value}`)}</span>
    const items = availableLangs.map((value, index) => {
        return (language !== value && <Dropdown.Item key={`lang-${index}`} eventKey={value}>
            <Item>
                {renderTitle(value)}
            </Item>
        </Dropdown.Item>)
    })

    return (
        <Wrapper className={className}>
            {availableLangs.length > 1 ? (
                <DropdownButton title={renderTitle(language)} onSelect={onSelect}>
                    {items}
                </DropdownButton>
            ) : (renderTitle(language))}
        </Wrapper>
    )
}

Lang.propTypes = {
    className: PropTypes.string
}