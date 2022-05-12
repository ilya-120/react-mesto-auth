import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, link, name, likes, onCardClick, onCardLike, onCardDeleteClick }) {
    const currentUser = React.useContext(CurrentUserContext)

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`elements__card-like ${isLiked && 'elements__card-like_activ'}`);

    function handleCardClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDeleteClick(card)
    }

    return (
        <article className="elements__card">
            {isOwn && <button className="elements__card-delete" type="button" onClick={handleDeleteClick}></button>}
            <img className="elements__card-image" src={link} alt={`Фото ${name}`} onClick={handleCardClick} />
            <div className="elements__card-name">
                <h2 className="elements__card-title">{name}</h2>
                <div className="element__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="element__likes-volume">{likes}</span>
                </div>
            </div>
        </article>
    );
}

export default Card;