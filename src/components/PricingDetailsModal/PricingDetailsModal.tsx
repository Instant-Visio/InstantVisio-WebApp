import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(() => ({
    customModal: {
        width: '100VW',
        height: '100VH',
    },
}))

// TODO: refacto with newsletterModal directly in modal ?
export default function PricingDetailsModal(props) {
    const { t } = useTranslation(['common', 'pricing-details'])
    const classes = useStyles()

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName={classes.customModal}
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>
                    {t('modal.close-button')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
