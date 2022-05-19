import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import UseForm from './UseForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const { enteredValues, errors, handleChange, isFormValid, resetForm } = UseForm();

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
        onAddPlace({
          name: enteredValues.title,
          link: enteredValues.link,
        });
    }

    useEffect(() => {
      resetForm();
    }, [resetForm, isOpen]);

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            disabled={!isFormValid}
            onLoading={onLoading ? 'Сохранение...' : 'Создать'}>
            <input
                className="popup__input popup__input_type_name"
                id="input-name"
                required
                minLength="2"
                maxLength="40"
                type="text"
                name="title"
                placeholder="Название"
                onChange={handleChange}
                value={enteredValues.title || ''}>
            </input>
            <span
                className="popup__error">
                   {errors.title}
            </span>
            <input
                className="popup__input popup__input_type_link"
                id="input-link"
                required
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                onChange={handleChange}
                value={enteredValues.link || ''}>
            </input>
            <span
                className="popup__error">
                  {errors.link}
            </span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
