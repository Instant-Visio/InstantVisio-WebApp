import React from 'react'
import { Dialog, DialogContent } from '@material-ui/core'
import { ModalProps } from './types'

export default function Modal({ isOpened, children, onClose }: ModalProps) {
    return (
        <div>
            <Dialog
                open={isOpened}
                onClose={onClose}
                fullWidth={true}
                maxWidth="sm">
                <DialogContent>{children}</DialogContent>
            </Dialog>
        </div>
    )
}
