import React from 'react'
import { Modal } from 'react-bootstrap'

// TODO check 'md' value was passed as size, but it does not exist
// size prop should not be hard-coded
const Dialog = ({ show, onHide, children, title, size = 'sm' }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size={'sm'}
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
