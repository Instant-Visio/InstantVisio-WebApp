import { Modal, Button } from 'react-bootstrap'
import React from 'react'

export default function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    En savoir plus
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Le responsable du traitement, Stéphane Luçon, s'assure du
                    traitement des données recueillies pour effectuer l'envoie
                    du SMS ou de l'email au correspondant. Suite à l'envoi, ces
                    données sont effacées au bout d'un jour. Pour en savoir plus
                    sur la gestion des données personnelles et pour exercer vos
                    droits, veuillez vous reporter à la page
                </p>
                <a href="/donnees-personnelles">Données personnelles</a>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
