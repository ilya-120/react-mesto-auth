import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ email, title, to, onClick, loggedIn, isMenuOpen, onClicOpen }) {
  return (
    <header className={`header ${loggedIn && 'header_isloggedIn'}`}>
      <div className={`${loggedIn && 'header__menu'}`}>
        <img className="header__logo" src={logo} alt="Логотип" />
        <ul className={`header__menu-button-null ${loggedIn && 'header__menu-button'}`} onClick={onClicOpen}>
          <li className={`${loggedIn && isMenuOpen && 'header__button_action_close'}`}></li>
          <li className={`${loggedIn && !isMenuOpen && 'header__button_action_open'}`}></li>
          <li className={`${loggedIn && !isMenuOpen && 'header__button_action_open'}`}></li>
        </ul>
      </div>
      <nav className={`header_nav ${loggedIn && 'header__nav_isloggedIn'} ${loggedIn && !isMenuOpen && 'header__nav_isMenuClose'}`}>
        <p className={`header__email ${loggedIn && 'header__email_isloggedIn'}`}>{email}</p>
        <Link to={to} className={`header__link ${loggedIn && 'header__link_isloggedIn'}`} onClick={onClick}>{title}</Link>
      </nav>
    </header>
  );
}

export default Header;
