import React from 'react';
import ThemeContext from './themeContext';
import './nav.css';
import logoSvg from '../logo.svg';
// import { ReactComponent as IconExit } from '../svg/Icon_exit.svg';
import { ReactComponent as IconCard } from '../svg/Icon_card.svg';
import { ReactComponent as IconUserCircle } from '../svg/Icon_user_circle.svg';
import { ReactComponent as IconLink } from '../svg/Icon_link.svg';
import { ReactComponent as IconSorting } from '../svg/Icon_sorting.svg';

class Nav extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {};
  };

  handleClick = (page) => {
    this.props.setPage(page)
  };

  render() {
    let theme = this.context;
    return (
      <nav id="idNav">
        {/* img src */}
        <button key="home" onClick={() => this.handleClick("home")}>
          <img src={logoSvg} tabIndex="0" alt="home" className={
            "icon home" + 
            ((this.props.activePage==="home")?" icon--active":"") +
            ((theme==="light")?" light":" dark")
            }/>
        </button>
        {/* inline with focus */}
        <button key="game" onClick={() => this.handleClick("game")}>
          <svg className={
            "icon" + 
            ((this.props.activePage==="game")?" icon--active":"") +
            ((theme==="light")?" light":" dark")
          } tabIndex="0" alt ="tic-tac-toe" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 5C4 4.44772 4.44772 4 5 4H7C7.55228 4 8 4.44772 8 5V7C8 7.55228 7.55228 8 7 8H5C4.44772 8 4 7.55228 4 7V5Z" fill="black"/>
            <path d="M10 5C10 4.44772 10.4477 4 11 4H13C13.5523 4 14 4.44772 14 5V7C14 7.55228 13.5523 8 13 8H11C10.4477 8 10 7.55228 10 7V5Z" fill="black"/>
            <path d="M17 4C16.4477 4 16 4.44772 16 5V7C16 7.55228 16.4477 8 17 8H19C19.5523 8 20 7.55228 20 7V5C20 4.44772 19.5523 4 19 4H17Z" fill="black"/>
            <path d="M4 11C4 10.4477 4.44772 10 5 10H7C7.55228 10 8 10.4477 8 11V13C8 13.5523 7.55228 14 7 14H5C4.44772 14 4 13.5523 4 13V11Z" fill="black"/>
            <path d="M11 10C10.4477 10 10 10.4477 10 11V13C10 13.5523 10.4477 14 11 14H13C13.5523 14 14 13.5523 14 13V11C14 10.4477 13.5523 10 13 10H11Z" fill="black"/>
            <path d="M16 11C16 10.4477 16.4477 10 17 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H17C16.4477 14 16 13.5523 16 13V11Z" fill="black"/>
            <path d="M5 16C4.44772 16 4 16.4477 4 17V19C4 19.5523 4.44772 20 5 20H7C7.55228 20 8 19.5523 8 19V17C8 16.4477 7.55228 16 7 16H5Z" fill="black"/>
            <path d="M10 17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19V17Z" fill="black"/>
            <path d="M17 16C16.4477 16 16 16.4477 16 17V19C16 19.5523 16.4477 20 17 20H19C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16H17Z" fill="black"/>  
          </svg>
        </button>
        {/* react 2.0 svg */}
        {/* <button key="transform" onClick={() => this.handleClick("transform")}>
          <IconExit tabIndex="0" alt="transform" className={"icon" + ((this.props.activePage==="transform")?" icon--active":"")}/>
        </button> */}
        <button key="accounts" onClick={() => this.handleClick("accounts")}>
          <IconCard tabIndex="0" alt="accounts" className={
            "icon" + ((this.props.activePage==="accounts")?" icon--active":"") +
            ((theme==="light")?" light":" dark")
          }/>
        </button>
        <button key="cities" onClick={() => this.handleClick("cities")}>
          <IconUserCircle tabIndex="0" alt="cities" className={
            "icon" + 
            ((this.props.activePage==="cities")?" icon--active":"") +
            ((theme==="light")?" light":" dark")
          }/>
        </button>
        <button key="link" onClick={() => this.handleClick("link")}>
          <IconLink tabIndex="0" alt="cities" className={
            "icon" + 
            ((this.props.activePage==="link")?" icon--active":"") +
            ((theme==="light")?" light":" dark")
          }/>
        </button>
        <button key="fifo" onClick={() => this.handleClick("fifo")}>
          <IconSorting tabIndex="0" alt="cities" className={
            "icon" + 
            ((this.props.activePage==="fifo")?" icon--active":"") +
            ((theme==="light")?" light":" dark")
          }/>
        </button>
      </nav>
    );
  };
};

Nav.contextType = ThemeContext;

export default Nav;