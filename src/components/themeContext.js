import React from 'react';

const themes = {
  dark: 'dark', // todo: specify color codes instead of string
  light: 'light'
}
const ThemeContext = React.createContext(themes.dark);

export default ThemeContext;