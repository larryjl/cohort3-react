import React, {Component} from 'react';
import ThemeContext from './components/themeContext';
import {ReactComponent as Logo} from './logo.svg';
import './App.css';
import Nav from './components/nav';
import Game from './components/game';
import Accounts from './components/accounts';
import Cities from './components/cities';
import Link from './components/link';
import Fifo from './components/Fifo';
import Header from './components/Header';

class App extends Component {

  constructor() {
    super();
    this.state = {
      activePage: "home",
      theme: 'dark'
    };
    this.handleTheme = this.handleTheme.bind(this);
  };

  setPage = (page) => {
    this.setState({
      activePage: page
    });
  };

  handleTheme(theme) {
    this.setState({theme: theme})
  };

  render() {
    const pages = {
      home: 
        <main id="idMainHome">
            <Logo 
              className={
                "logo logo--orbit"
                + ((this.state.theme==="light")?" light":" dark")
              } 
              alt="logo" 
            />
        </main>
      ,
      game: <Game/>,
      accounts: <Accounts/>,
      cities: <Cities/>,
      link: <Link/>,
      fifo: <Fifo/>,
    };
    let main = pages[this.state.activePage];
    return (
      <ThemeContext.Provider value = {this.state.theme}>
        <div className={'app ' + this.state.theme}>
          <Nav
            setPage={this.setPage}
            activePage={this.state.activePage}
          />
          <Header 
            onChange={this.handleTheme}
          />
          {main}
          <footer>
          </footer>
        </div>
      </ThemeContext.Provider>
    );
  }
};

export default App;
