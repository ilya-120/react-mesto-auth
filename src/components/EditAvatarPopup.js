import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateAvatar({ avatar: avatarRef.current.value });
    }

    React.useEffect(() => {
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
          class="popup__input popup__input_type_link"
          id="input-avatarLink"
          required
          type="url"
          name="avatar"
          placeholder="Ссылка на аватар"
          ref={avatarRef}>
        </input>
        <span
          class="popup__error input-avatarLink-error">
        </span>
      </PopupWithForm>
    );
}

export default EditAvatarPopup;