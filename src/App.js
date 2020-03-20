import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form>
          <label>
            Nom :
            <input type="text" name="name" />
          </label>
          <br />
          <label>
            Numéro de téléphone de votre proche :
            <input type="phone" name="phone" />
          </label>
          <br />
          <label>
            Email :
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Envoyer" />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      </header>
    </div>
  );
}

export default App;
