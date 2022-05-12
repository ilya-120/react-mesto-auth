import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ email, title, to, onClick }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <nav className="header__nav">
        <p className="header__email">{email}</p>
        <Link to={to} className="header__link" onClick={onClick}>{title}</Link>
      </nav>
    </header>
  );
}

export default Header;
