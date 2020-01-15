import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Cities from './cities';

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

describe('offline', () => {
  test('', () => {
    act(() => {
      // render components
      render(<Cities />, container);
    });
    // make assertions
  });
});

describe('online mock', () => {
  test('', async () => {

    const data = {
      key: 1,
      info: [
        {
          name: "springfield",
          lat: 1,
          lon: 2,
          pop: 100
        },{
          name: "shelbyville",
          lat: -1,
          lon: -2,
          pop: 1000
        }
      ]
    };
  
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(data)
      })
    );

    await act(async () => {
      render(<Cities />, container);
    });

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });
});