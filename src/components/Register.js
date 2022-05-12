import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }
    onRegister(email, password);
  }

  return (
    <>
      <section className="login">
        <h2 className="login__title">Регистрация</h2>
        <form className="login__form"
          onSubmit={handleSubmit}
        >
          <input
            className="login__input"
            aria-label="Ваша почта"
            type="Email"
            name="email"
            id="email"
            placeholder="Email"
            required
            minLength="2"
            maxLength="50"
            onChange={handleChangeEmail}
          />
          <span id="email-error" className="login__error" />
          <input
            className="login__input"
            aria-label="Пароль"
            type="Password"
            name="password"
            id="password"
            placeholder="Пароль"
            required
            minLength="6"
            maxLength="200"
            onChange={handleChangePassword}
          />
          <span id="password-error" className="login__error" />
          <button type="submit" className="login__button">Зарегистрироваться</button>
        </form>
        <p className="login__subtitle">Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link></p>

      </section>
    </>
  )
}

export default Register;
