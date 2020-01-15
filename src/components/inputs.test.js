import React, {useState, useEffect} from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import inputs from './inputs';
const {Button, Input} = inputs;

describe('inputs', () => {
  const mockCallback = jest.fn();
  const callbacks = {
    f:mockCallback, p:[0,1]
  };

  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  
  it('button', () => {
    function Component (props) {
      const [inputs, setInputs] = useState({});
      return (
        <div>
          <Button 
            id={0}
            name={'name'}
            label={'label'}
            callbacks={callbacks}
            setInputs={setInputs}
            classes={''}
          />
        </div>
      );
    };
    act(() => {
      // render components
      render(<Component />, container);
    });
    expect().toBe();
  });

  it('input', () => {
    function Component (props) {
      const [inputs, setInputs] = useState({});
      return (
        <div>
          <Input 
            id={0}
            name={'name'}
            type={'text'}
            inputs={inputs}
            setInputs={setInputs}
            classes={''}
          />
        </div>
      );
    };
    act(() => {
      render(<Component />, container);
    });
    expect().toBe();
  });
});