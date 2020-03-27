import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'

import Header from '../Header'
import DefaultStyled from '../../styles/Default'
import Footer from '../Footer'

const PersonalData = () => (
    <>
        <Header />
        <DefaultStyled>
            <Container className="default">
                <h2 className="default-title">Données personnelles</h2>
                <p>Les informations recueillies dans le questionnaire ne sont ni enregistrées ni stockées. Le responsable du traitement et de l’absence de traitement des données est Stéphane Luçon, 5 montée des Chrestianne, Pierrevert.</p>
                <p>Les données marquées par un astérisque dans le questionnaire doivent obligatoirement être fournies. Dans le cas contraire, il sera impossible d’envoyer le message SMS ou email vers le correspondant.</p>
                <p>Les données collectées seront communiquées aux seuls destinataires suivants : OVH Télécom, société assurant la distribution des messages SMS et SendMail, société assurant la distribution des messages email.</p>
                <p>Elles sont conservées pendant 1 jour.</p>
                <p>Vous pouvez accéder aux données vous concernant, les rectifier, demander leur effacement ou exercer votre droit à la limitation du traitement de vos données.</p>
                <p>Consultez le site cnil.fr pour plus d’informations sur vos droits.</p>
                <p>Pour exercer ces droits ou pour toute question sur le traitement de vos données dans ce dispositif, vous pouvez contacter Stéphane Luçon, contact@instantvisio.com, téléphone 0787 715 787.</p>
                <p>Si vous estimez, après nous avoir contactés, que vos droits « Informatique et Libertés » ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL.</p>
            </Container>
        </DefaultStyled>
        <Footer />
    </>
)

export default PersonalData