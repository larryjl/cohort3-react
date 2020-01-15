import React, {useContext} from 'react';
import ThemeContext from './themeContext';
import styles from './Header.module.css';
import { ReactComponent as IconView } from '../svg/Icon_view.svg';

function Header(props) {  
  const theme = useContext(ThemeContext);

  return (
    <header>
      <button
        key={0}
        name={'theme'}
        onClickCapture={(e) => {
          props.onChange((theme==='dark')?'light':'dark');
        }}
        id={'themeBtn'}
        className={styles.button}
      >
        <IconView
          key={0}
          name={'theme'}
          alt={'theme button'}
          tabIndex="0"
          className={[styles.icon, styles[theme]].join(' ')}
        />
      </button>
    </header>
  );
};

export default Header;