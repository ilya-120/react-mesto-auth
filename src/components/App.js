import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import PopupWithConfirm from './PopupWithConfirm.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [removedCardId, setRemovedCardId] = React.useState('');

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .updateCardLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных: ${err}`)
      })
  }

  function handleCardDeleteClick(card) {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setRemovedCardId(card);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter(c => c._id !== card._id))
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных: ${err}`)
      })
  }

  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([userInfoRes, cardListRes]) => {
        setCurrentUser(userInfoRes)
        setCards(cardListRes)
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных: ${err}`)
      })
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`неудачно: ${err}`)
      })
  }

  function handleUpdateAvatar(data) {
    api
      .setAvatar(data)
      .then((userInfoRes) => {
        setCurrentUser(userInfoRes)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`)
      })
  }

  function handleAddPlaceSubmit(data) {
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`)
      })
  }

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups()
    }
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsConfirmPopupOpen(false)
    setSelectedCard(null)
  }

  document.addEventListener('keydown', handleEscClose)

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDeleteClick={handleCardDeleteClick}
        cards={cards}
      />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <PopupWithConfirm
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
        card={removedCardId}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  )
}

export default App;
