import React from 'react';
import ReactDOM from 'react-dom';
import './TransformComp.css';

class Transform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div id="idTransform">
        <h2>Transformations</h2>
      </div>
    );
  }
};

ReactDOM.render(
  <Transform />,
  document.getElementById('root')
);


export default Transform;
