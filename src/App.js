import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/NavComp';
import Game from './components/TicComp';
import Transform from './components/TransformComp';
import Accounts from './components/AccountsComp';
import Cities from './components/CitiesComp';

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render () {
    return (
      <div className="App">
        <a name="top">
        <Nav
        />
        </a>
        <header className="App-header svgStyle">
          <img src={logo} className="App-logo bounceIn" alt="logo" />
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        </header>
        <main>
          <hr/>
          <a name="game">
            <Game
            />
          </a>
          <hr/>
          <a name="transform">
            <Transform
            />
          </a>
          <hr/>
          <a name="accounts">
            <Accounts
            />
          </a>
          <hr/>
          <a name="cities">
            <Cities
            />
          </a>
        </main>
        <footer>
        </footer>
      </div>
    );
  }
};

export default App;
