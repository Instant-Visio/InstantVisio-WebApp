import { Modal, Button } from 'react-bootstrap'
import React from 'react'
import { Trans } from 'react-i18next'
import { Link } from 'react-router-dom'

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
                <Trans i18nKey="home:information.data-mentions.management">
                    Le responsable de traitement, Stéphane Luçon, s'assure du
                    traitement des données recueillies pour effectuer l'envoi du
                    SMS ou de l'e-mail au correspondant. Suite à l'envoi, ces
                    données sont effacées au bout d'un jour. Pour en savoir plus
                    sur la gestion des données personnelles et pour exercer vos
                    droits, veuillez vous reporter à la page
                    <Link to="/donnees-personnelles">Données personnelles</Link>
                    .
                </Trans>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
