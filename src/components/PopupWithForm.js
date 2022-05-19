import React from 'react';
import Popup from './Popup';

function PopupWithForm({ name, isOpen, onClose, title, buttonTitle, onSubmit, disabled, onLoading, children }) {

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className="popup__container-title">{title}</h2>
      <form
        name={name}
        className={`form popup__container-form popup__${name}`}
        onSubmit={onSubmit}
        noValidate>
        {children}
        <button
          type="submit"
          disabled={disabled}
          className={`popup__container-submit-button ${disabled && 'popup__container-submit-button_disabled'}`}>
          {buttonTitle}
          {onLoading}
        </button>
      </form>
    </Popup>
  )
}

export default PopupWithForm
