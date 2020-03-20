import React from 'react';

import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';

import './App.css';

function App() {
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
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="email" placeholder="Saisissez votre nom" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Saisissez votre email" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control type="phone" placeholder="Saisissez votre numéro de téléphone" />
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
