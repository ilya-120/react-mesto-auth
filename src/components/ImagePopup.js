import React from 'react';

function ImagePopup({card, onClose}) {
  const handleClickOnBackground = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };
    return (
        <div className={`popup popup_image ${card && 'popup_opened'}`}
            id="popup-image"
            onClick={handleClickOnBackground}>
            <div className="popup__container-image">
                <button className="popup__container-close-button" type="button"
                    onClick={onClose}>
                </button>
                <img className="popup__card-image"
                    src={card && card.link}
                    alt={card && card.name}
                />
                <p className="popup__card-title">{card && card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;
