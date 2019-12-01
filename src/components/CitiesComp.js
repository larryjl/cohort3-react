import React from 'react';
import ReactDOM from 'react-dom';
import './CitiesComp.css';

class Cities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div id="idCities">
        <h2>Cities</h2>
      </div>
    );
  }
};

ReactDOM.render(
  <Cities />,
  document.getElementById('root')
);


export default Cities;
