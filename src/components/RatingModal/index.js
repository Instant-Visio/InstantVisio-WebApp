import { Modal, Button } from 'react-bootstrap'
import React, { useState } from 'react'
import BeautyStars from 'beauty-stars'

export default function RatingModal(props) {
    const [value, setvalue] = useState(0)
    const [modalShow, setModalShow] = React.useState(props.hasLeft)

    return (
        <Modal
            {...props}
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="mds"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Votre avis
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p>
                    Quel a été le niveau de qualité de cette communication en visiophonie ?
                    </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <BeautyStars
                        value={value}
                        onChange={(val) => setvalue(val)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setModalShow(false)}>
                    PAS MAINTENANT
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        console.log('ma note pour cette call est de : ', value)
                        setModalShow(false)
                    }}>
                    VALIDER
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
