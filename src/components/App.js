import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
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
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js'


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [removedCardId, setRemovedCardId] = useState('');
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          setLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    api.getAppInfo()
      .then(([userInfoRes, cardListRes]) => {
        setCurrentUser(userInfoRes)
        setCards(cardListRes)
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных: ${err}`)
      })
  }, [])

  function onLogin(email, password) {
    auth
      .signin(email, password)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setEmail(email);
          navigate('/');
        }
      })
      .catch((err) => {
        setIsRegistrationSuccessful(false);
        console.log(err);
        handleInfoTooltip();
      });
  }

  function onRegister(email, password) {
    auth
      .signup(email, password)
      .then(res => {
        if (res.data._id) {
          setIsRegistrationSuccessful(true);

          navigate('/sign-in');
        } else {
          setIsRegistrationSuccessful(false);

        }
      })
      .catch(() => {
        setIsRegistrationSuccessful(false);
      })
      .finally(() => handleInfoTooltip()
      );
  }

  function onSignOut() {
    setLoggedIn(false);
    setEmail('');
    navigate('/sign-in');
    localStorage.removeItem('jwt');
  }

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
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter(c => c._id !== card._id))
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных: ${err}`)
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(true)
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
    setIsInfoTooltipOpen(false);
    setSelectedCard(null)
  }

  document.addEventListener('keydown', handleEscClose)


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/"
          element={
            <>
              <Header email={email} title="Выйти" to="/sign-in" onClick={onSignOut} />
              <ProtectedRoute>
                component={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDeleteClick={handleCardDeleteClick}
                cards={cards}
              </ProtectedRoute>
            </>
          }
        />
        <Route path={loggedIn ? '' : '/sign-in'}
          element={
            <>
              <Header title="Регистрация" to="/sign-up" />
              <Login onLogin={onLogin} />
            </>
          }
        />
        <Route path={loggedIn ? '' : '/sign-up'}
          element={
            <>
              <Header title="Войти" to="/sign-in" />
              <Register onRegister={onRegister} />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
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
      <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isInfoTooltipOpen}
        isSuccess={isRegistrationSuccessful}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider >
  )
}

export default App;
