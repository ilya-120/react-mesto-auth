import React, { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import UseForm from './UseForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  const { enteredValues, errors, handleChange, isFormValid, resetForm } = UseForm();

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault()

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: enteredValues.name,
      description: enteredValues.about,
    });
  }
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [resetForm, isOpen, currentUser]);

  return (
    <PopupWithForm
      name="edit-card"
      title="Редактировать профиль"
      onLoading={onLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!isFormValid}>
      <input
        className="popup__input popup__input_type_title"
        id="input-names"
        type="text"
        name="name"
        required
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        value={enteredValues.name || ''}
        onChange={handleChange}>
      </input>
      <span
        className="popup__error">
          {errors.name}
      </span>
      <input
        className="popup__input popup__input_type_subtitle"
        id="input-about"
        type="text"
        name="about"
        required
        minLength="2"
        maxLength="200"
        placeholder="О себе"
        value={enteredValues.about || ''}
        onChange={handleChange}>
      </input>
      <span
        className="popup__error">
          {errors.about}
        </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
