import React, {useState, useContext} from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ThemeContext from './themeContext';

import Header from './Header';

describe('header click', () => {

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

  test('click', () => {
    const onChange = jest.fn();
    function Comp(props) {
      return (
        <ThemeContext.Provider value = {'dark'}>
          <Header
            onChange = {onChange}
          />
        </ThemeContext.Provider>
      );
    };

    act(() => {
      render(
        <Comp 
        />, container
      );
    });
    const button = document.getElementById("themeBtn");
  
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    // expect(onChange.mock.calls[0][0]).toBe('light'); // todo: mock context

    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onChange).toHaveBeenCalledTimes(2);
    // expect(onChange.mock.calls[1][0]).toBe('dark'); // todo: mock context
  });
});