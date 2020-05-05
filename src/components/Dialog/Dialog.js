import React from 'react'
import { Modal } from 'react-bootstrap'

const Dialog = ({ show, onHide, children, title, size = 'md' }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size={size}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    )
}

export default Dialog
