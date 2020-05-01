import React from 'react'
import Icon from '@mdi/react'
import { mdiCheckCircle, mdiAlertCircle } from '@mdi/js'
import styled from 'styled-components'
import { Spinner } from 'react-bootstrap'
import {
    STATE_DENIED,
    STATE_GRANTED,
    STATE_WAITING,
} from '../../../hooks/useCameraMicrophonePermission'

export const CheckItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    svg {
        margin-right: 8px;
    }

    .spinner {
        flex-shrink: 0;
        flex-basis: auto;
        margin-right: 12px;
        margin-left: 4px;
        width: 30px;
        height: 30px;
    }
`

const iconSize = 1.5
const Check = ({ state, i18nKey, i18nInstance }) => {
    const formatData = () => {
        switch (state) {
            default:
            case STATE_WAITING:
                return {
                    icon: (
                        <Spinner
                            animation="border"
                            role="status"
                            className="spinner"
                        />
                    ),
                    text: i18nInstance(`${i18nKey}.waiting`),
                }
            case STATE_GRANTED:
                return {
                    icon: (
                        <Icon
                            path={mdiCheckCircle}
                            size={iconSize}
                            color="green"
                        />
                    ),
                    text: i18nInstance(`${i18nKey}.granted`),
                }
            case STATE_DENIED:
                return {
                    icon: (
                        <Icon
                            path={mdiAlertCircle}
                            size={iconSize}
                            color="red"
                        />
                    ),
                    text: i18nInstance(`${i18nKey}.denied`),
                }
        }
    }

    const data = formatData(state)

    return (
        <CheckItem>
            {data.icon}

            {data.text}
        </CheckItem>
    )
}

export default Check
