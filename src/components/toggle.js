import React, { useState } from "react";
import './toggle.css';

function Toggle(props) {
  const [state, setState] = useState(false);
  return (
    <label className="switch" htmlFor={props.name}>
      <input type="checkbox" id={props.name} 
        onClick={() => {
          setState(initial => !initial);
          props.onChange(!state);
        }}
        disabled = {props.disabled}
        checked = {props.checked}
      >
        
      </input>
      <span className='slider'></span>
    </label>
  );
}

export default Toggle;