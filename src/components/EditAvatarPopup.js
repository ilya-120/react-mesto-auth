import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

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
        buttonTitle="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}>
        <input
          className="popup__input popup__input_type_link"
          id="input-avatarLink"
          required
          type="url"
          name="avatar"
          placeholder="Ссылка на аватар"
          ref={avatarRef}>
        </input>
        <span
          className="popup__error input-avatarLink-error">
        </span>
      </PopupWithForm>
    );
}

export default EditAvatarPopup;