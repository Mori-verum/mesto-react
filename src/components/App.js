import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import { useEffect, useState } from 'react';
// import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import AddPlacePopup from './AddPlacePopup.js'

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null);
  // const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState({
    isEditAvatarPopupOpen: false,
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isImagePopupOpen: false
  })

  useEffect(() => {
    api
      .getDataProfile()
      .then((dataUser) => {
        setCurrentUser(dataUser)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    api
      .getAllCards()
      .then((dataCards) => {
        setCards(dataCards)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  })

  function handleEditAvatarClick() {
    setIsOpenPopup({ isEditAvatarPopupOpen: true });
  }

  function handleEditProfileClick() {
    setIsOpenPopup({ isEditProfilePopupOpen: true });
  }

  function handleAddPlaceClick() {
    setIsOpenPopup({ isAddPlacePopupOpen: true });
  }

  function handleCardClick(data) {
    setIsOpenPopup({ isImagePopupOpen: true });
    setSelectedCard(data);
  }

  function handleEscClose(evt) {
    if (evt.keyCode === 27) {
      closeAllPopups();
    }
  }

  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    for (let prop in isOpenPopup) {
      setIsOpenPopup({ prop: false });
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data.avatar)
      .then(data => {
        setCurrentUser(data)
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCard}
          cards={cards}
        />
        <Footer />
        <ImagePopup
          isOpen={isOpenPopup.isImagePopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
          card={selectedCard}
        />

        <EditAvatarPopup
          isOpen={isOpenPopup.isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isOpenPopup.isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
        />

        <AddPlacePopup
          onAddCard={handleCardSubmit}
          isOpen={isOpenPopup.isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
        />

        {/* <PopupWithForm
        name='delete'
        isOpen={isDeletePopupOpen}
        title='???? ???????????????'
        submitText='????' />  */}

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
