import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import UseForm from './UseForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const avatarRef = useRef();
  const { errors, handleChange, isFormValid } = UseForm();

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen]
  );

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      onLoading={onLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!isFormValid}>
      <input
        className="popup__input popup__input_type_link"
        id="input-avatarLink"
        required
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        ref={avatarRef}
        onChange={handleChange}>
      </input>
      <span
        className="popup__error">
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
