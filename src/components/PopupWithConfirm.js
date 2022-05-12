import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function PopupWithConfirm({ isOpen, onClose, card, onSubmit }) {

  function handleSubmit(evt) {
    evt.preventDefault()
    onSubmit(card)
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonTitle="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  );
}

export default PopupWithConfirm;