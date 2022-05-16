import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleChangeName(evt) {
        setName(evt.target.value)
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault()

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            description,
        });
    }
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.

    useEffect(() => {
        if (isOpen) {
            setName(currentUser.name)
            setDescription(currentUser.about)
        }
    }, [currentUser, isOpen])

    return (
        <PopupWithForm
            name="edit-card"
            title="Редактировать профиль"
            buttonTitle="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input
                className="popup__input popup__input_type_title"
                id="input-names"
                type="text"
                name="name"
                required
                minlength="2"
                maxlength="40"
                placeholder="Имя"
                value={name || ''}
                onChange={handleChangeName}>
            </input>
            <span
                className="popup__error input-names-error">
            </span>
            <input
                className="popup__input popup__input_type_subtitle"
                id="input-about"
                type="text"
                name="about"
                required
                minlength="2"
                maxlength="200"
                placeholder="О себе"
                value={description || ''}
                onChange={handleChangeDescription}>
            </input>
            <span
                className="popup__error input-about-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
