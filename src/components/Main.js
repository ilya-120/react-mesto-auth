import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDeleteClick, cards }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                <button className="profile__avatar-button"
                    onClick={onEditAvatar}>
                </button>
                <div className="profile__info">
                    <div className="profile__author">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button aria-label="Редактировать"
                            className="profile__edit-button"
                            type="button"
                            onClick={onEditProfile}>
                        </button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button"
                    onClick={onAddPlace}>
                </button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        link={card.link}
                        name={card.name}
                        likes={card.likes.length}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDeleteClick={onCardDeleteClick}
                    />
                )
                )}
            </section>
        </main>
    );
}

export default Main;