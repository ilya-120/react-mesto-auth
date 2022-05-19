import React from 'react';
import UseForm from './UseForm';

function Login({ onLogin, onLoading }) {
  const { enteredValues, errors, isFormValid, handleChange } = UseForm({});
  function handleSubmit(evt) {
    evt.preventDefault();
    if (!enteredValues.email || !enteredValues.password || !isFormValid) {
      console.log(isFormValid);
      return;
    }
    onLogin(enteredValues.email, enteredValues.password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
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
          value={enteredValues.email || ''}
          onChange={handleChange}
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
          value={enteredValues.password || ''}
          onChange={handleChange}
        />
        <span id="password-error" className="login__error">{errors.password}</span>
        <button
        type="submit"
        className="login__button">{onLoading ? "Вход..." : "Войти"}</button>
      </form>
    </section>
  )
}

export default Login;
