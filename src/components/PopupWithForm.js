import React from 'react';

function PopupWithForm({name, isOpen, onClose, title, buttonTitle, onSubmit, children}) {
  const handleClickOnBackground = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

    return (
      <div className={`popup ${isOpen && 'popup_opened'}`} id={`popup-${name}`} onClick={handleClickOnBackground}>
        <div className="popup__container">
          <button
            className="popup__container-close-button"
            type="button"
            onClick={onClose}
          />
          <h2 className="popup__container-title">{title}</h2>
          <form name={name} className={`popup__container-form popup__${name}`} onSubmit={onSubmit}>
            {children}
            <button type="submit" className="popup__container-submit-button">{buttonTitle}</button>
          </form>
        </div>
      </div>
    )
  }

  export default PopupWithForm
