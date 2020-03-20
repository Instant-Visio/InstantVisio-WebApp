import React, { useEffect, useState } from 'react';

import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

import './App.css';

const hasValidData = (values) => Object.values(values).every(item => item.trim())

function App() {
  useEffect(() => {
    // when using vh and vw units in css:
    // to make sure the height taken into account
    // is the whole window size,
    // not the visible window size
    // (critical on mobile, where, on click on the contact form inputs,
    // the keyboard appears and takes half of the window size,
    // which shrinks the form size - unpleasant user experience)
    setTimeout(() => {
      const viewheight = window.innerHeight;
      const viewwidth = window.innerWidth;
      const viewport = document.querySelector('meta[name=viewport]');
      viewport.setAttribute('content', `height=${viewheight}px, width=${viewwidth}px, initial-scale=1.0`);
    }, 300);
  }, []);

  const [values, setValues] = useState({
    personName: '',
    mail: '',
    phone: ''
  });

  const handleChange = (event) => {
    setValues(({ ...values, [event.target.name]: event.target.value }));
  };

  const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!hasValidData(values)){
      window.alert('Certains champs n\'ont pas été renseignés, veuillez procéder aux modifications')
      return
    }
    
    const { personName, mail } = values;

    const VISIOURL = `${process.env.REACT_APP_VISIODOMAIN}/${Date.now()}${uuidv4()}`;

    const html = `Bonjour, c'est ${personName}, je voudrais que tu me rejoignes en visio en cliquant sur ce lien ${VISIOURL}`;

    const name = 'Demande URGENTE de visiophonie de votre proche';

    const userInfo = {
      name,
      mail,
      html
    };

    axios.post(
      process.env.REACT_APP_SENDING_EMAIL,
      userInfo,
      {
        headers : {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json'
        }
      }
    )
    .then((response) => {
      console.log(response)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Instant Visio</h1>
        <Container>
          <p className="App-desc">Saisissez le numéro de téléphone mobile ou l'email de la personne que vous souhaitez rejoindre en visiophone (vous pouvez saisir les deux).</p>
          <p className="App-desc">Un message sera envoyé pour que votre proche puisse vous rejoindre directement en visiophone et échanger avec vous.</p>
        </Container>
      </header>
      <body className="App-body">
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Votre nom</Form.Label>
              <Form.Control
                type="text"
                name="personName"
                placeholder="Ex. : Laure, François"
                title="Veuillez saisissez votre nom"
                value={values.personName}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Numéro de téléphone de votre proche</Form.Label>
              <Form.Control
                type="phone"
                name="phone"
                placeholder="Ex : 0706050403"
                title="Saisissez le numéro de téléphone de votre proche"
                value={values.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-mail de votre proche (optionnel)</Form.Label>
              <Form.Control
                type="email"
                name="mail"
                placeholder="Ex. : laure.durand@gmail.com"
                title="Saisissez l'adresse e-mail de votre proche"
                value={values.mail}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Button style={ {float: "right"}} variant="success" type="submit">
              Joindre mon proche
            </Button>
          </Form>
        </Container>
      </body>
    </div>
  );
}

export default App;
