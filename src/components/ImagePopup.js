import React from 'react';

function ImagePopup({card, onClose}) {
    return (
        <div class={`popup popup_image ${card && 'popup_opened'}`}
            id="popup-image">
            <div class="popup__container-image">
                <button class="popup__container-close-button" type="button"
                    onClick={onClose}>
                </button>
                <img class="popup__card-image"
                    src={card?.link}
                    alt={card?.name}
                />
                <p class="popup__card-title">{card && card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;