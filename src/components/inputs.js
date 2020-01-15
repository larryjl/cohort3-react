import React from "react";
const inputs = {

  Button(props) {
    const {id, name, label, classes, callbacks, setNewState, newState} = props
    return(
      <button 
        key={id}
        name={name}
        onClick={(e) => inputs.handleClick(e, callbacks, setNewState, newState)} 
        className={classes}
      >
        {label}
      </button>
  )},

  handleClick(e, callbacks, setNewState, newState) {
    try {
      const result = callbacks[e.currentTarget.name].f(
        ...callbacks[e.currentTarget.name].p
      );
      setNewState((newState!==undefined)?newState:result);
    } catch (error) {
      console.log(error);
    };
  },

  Input(props) {
    const {id, name, type, inputs, setInputs, classes} = props
    return (
      <div>
        <span>{name}: </span>
        <input
          key={id}
          name={name}
          type={type}
          value={inputs[name]}
          onChange={(e) => inputs.handleInputChange(e, setInputs)}
          onBlur={(e) => inputs.handleInputChange(e, setInputs)}
          className={classes}
        ></input>
      </div>
    );
  },

  handleInputChange(e, setInputs) {
    setInputs(state => ({...state, [e.currentTarget.name]: e.currentTarget.value}));
  },

};

export default inputs;