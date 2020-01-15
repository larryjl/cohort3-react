import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Toggle from './toggle';

describe('toggle click', () => {

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

  test('not disabled', () => {
    const disabled = false;
    const onChange = jest.fn();

    act(() => {
      // render components
        render(
        <Toggle
          name="toggle" 
          disabled={disabled} 
          onChange={onChange}
        />, 
        container
      );
    });

    const toggle = document.getElementById("toggle");
    expect(toggle.checked).toBe(false);
  
    act(() => {
      toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(toggle.checked).toBe(true);
    expect(onChange.mock.calls[0][0]).toBe(true);

    act(() => {
      toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(toggle.checked).toBe(false);

    expect(onChange.mock.calls[1][0]).toBe(false);
  });

  test('disabled', () => {
    const disabled = true;
    const onChange = jest.fn();

    act(() => {
      // render components
        render(
        <Toggle
          name="toggle" 
          disabled={disabled} 
          onChange={onChange}
        />, 
        container
      );
    });

    const toggle = document.getElementById("toggle");
    expect(toggle.checked).toBe(false);
    expect(toggle.disabled).toBe(true);
  
    act(() => {
      toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(toggle.checked).toBe(true);

    act(() => {
      toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(toggle.checked).toBe(false);
  });
});

