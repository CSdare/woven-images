import React from 'react';
import dareLogo from '../../img/dare-logo.svg';
import wovenJSLogo from '../../img/wovenjs-logo.svg';

const Header = () => {
  return (
    <header>
      <img id="wovenjs-logo" src={wovenJSLogo} alt="wovenjs" />
      <h1>WovenJS Demo</h1>
      <img id="dare-logo" src={dareLogo} alt="dare" />
    </header>
  );
}

export default Header;
