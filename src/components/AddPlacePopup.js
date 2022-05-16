import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [nameCard, setNameCard] = useState('')
    const [linkCard, setLinkCard] = useState('')

    function handleChangeCardName(evt) {
        setNameCard(evt.target.value);
    }

    function handleChangeCardLink(evt) {
        setLinkCard(evt.target.value);
    }
    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
        onAddPlace({
            name: nameCard,
            link: linkCard,
        });
    }

    React.useEffect(() => {
        setNameCard('');
        setLinkCard('');
    }, [isOpen]
    );

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            buttonTitle="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input
                className="popup__input popup__input_type_name"
                id="input-name"
                required
                minLength="2"
                maxLength="40"
                type="text"
                name="name"
                placeholder="Название"
                onChange={handleChangeCardName}
                value={nameCard}>
            </input>
            <span
                className="popup__error input-name-error">
            </span>
            <input
                className="popup__input popup__input_type_link"
                id="input-link"
                required
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                onChange={handleChangeCardLink}
                value={linkCard}>
            </input>
            <span
                className="popup__error input-link-error">
            </span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
