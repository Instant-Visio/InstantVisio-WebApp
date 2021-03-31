import { ReactNode } from 'react'
import { ModalProps as MaterialModalProps } from '@material-ui/core'

// eslint-disable-next-line no-undef
export interface ModalProps extends Pick<MaterialModalProps, 'onClose'> {
    isOpened: boolean
    children?: ReactNode
}

export type ModalType = 'Newsletter' | 'PricingTable' | 'InviteParticipants'
