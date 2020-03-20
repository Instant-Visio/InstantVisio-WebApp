import React, { useState } from 'react';

import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

import './App.css';

function App() {
  const [values, setValues] = useState({
    personName: '',
    mail: '',
    phone: ''
  });

  const handleChange = (event) => {
    setValues(({ ...values, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { personName, mail } = values;

    const html = `Bonjour, c'est ${personName}, je voudrais que tu me rejoignes en visio en cliquant sur ce lien`

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
        <p>Saisissez le numéro de téléphone mobile ou l'email de la personne que vous souhaitez rejoindre en visiophone (vous pouvez saisir les deux)</p>
        <p>Un message sera envoyé pour que votre proche puisse vous rejoindre directement en visiophone et échanger avec vous.</p></Container>
      </header>
      <body className="App-body">
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="personName"
                placeholder="Saisissez votre nom"
                value={values.personName}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="mail"
                placeholder="Saisissez votre email"
                value={values.mail}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control
                type="phone"
                name="phone"
                placeholder="Saisissez votre numéro de téléphone"
                value={values.phone}
                onChange={handleChange}
              />
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
