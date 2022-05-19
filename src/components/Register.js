import React from 'react';
import { Link } from 'react-router-dom';
import UseForm from './UseForm';

function Register({ onRegister, onLoading }) {
  const { enteredValues, errors, isFormValid, handleChange } = UseForm({});
  function handleSubmit(evt) {
    evt.preventDefault();
    if (!enteredValues.email || !enteredValues.password || !isFormValid) {
      console.log(isFormValid);
      return;
    }
    onRegister(enteredValues.email, enteredValues.password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="form login__form"
        onSubmit={handleSubmit}
        noValidate
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
          onChange={handleChange}
          value={enteredValues.email || ''}
        />
        <span id="email-error" className="login__error">{errors.email}</span>
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
          onChange={handleChange}
          value={enteredValues.password || ''}
        />
        <span id="password-error" className="login__error">{errors.password}</span>
        <button type="submit" className="login__button">{onLoading ? "Регистрация..." : "Зарегистрироваться"}</button>
      </form>
      <p className="login__subtitle">Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link></p>

    </section>
  )
}

export default Register;
