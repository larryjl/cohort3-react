import React from 'react';
import ReactDOM from 'react-dom';
import './AccountsComp.css';

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div id="idAccounts">
        <h2>Accounts</h2>
      </div>
    );
  }
};

ReactDOM.render(
  <Accounts />,
  document.getElementById('root')
);


export default Accounts;
