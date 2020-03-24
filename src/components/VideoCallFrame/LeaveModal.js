import React from 'react'
import {ModalDialog, ModalBody, ModalFooter, Button} from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'

const LeaveModal = () => (
    <ModalDialog>
        <ModalHeader>
            <p>Quitter l'appel</p>
        </ModalHeader>
        <ModalBody>
            <p>Souhaitez-vous vraiment quitter l'appel ?</p>
        </ModalBody>
        <ModalFooter>
            <Button variant="primary">Oui</Button>
            <Button variant="secondary">Annuler</Button>
        </ModalFooter>
    </ModalDialog>
)

export default LeaveModal