import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/api.js';

function App() {
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
    api.getAllCards()
      .then((dataCards) => {
        setCards(dataCards)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

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
    console.log(data)
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

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  })

  function closeAllPopups() {
    for (let prop in isOpenPopup) {
      setIsOpenPopup({ prop: false });
    }
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
      />
      <Footer />
      <ImagePopup
        isOpen={isOpenPopup.isImagePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClose}
        card = {selectedCard}
      />

      <PopupWithForm
        name='edit-avatar'
        isOpen={isOpenPopup.isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClose}
        title='Обновить аватар'
        children={(
          <section className="popup__form-section">
            <input required placeholder="Ссылка на картинку" type="url" name="link"
              className="popup__input popup__input_margin_big" />
            <span className="popup__input-error" id="link--avatar-error"></span>
          </section>)
        }
        submitText='Сохранить' />

      <PopupWithForm
        name='edit'
        isOpen={isOpenPopup.isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClose}
        title='Редактировать профиль'
        children={(
          <>
            <section className="popup__form-section">
              <input required placeholder="Введите имя" type="text" name="name"
                className="popup__input popup__input_margin_big" minLength="2" maxLength="40" />
              <span className="popup__input-error" id="username-error"></span>
            </section>
            <section className="popup__form-section">
              <input required placeholder="Введите описание" type="text" name="description"
                className="popup__input" minLength="2" maxLength="200" />
              <span className="popup__input-error" id="description-error"></span>
            </section>
          </>)
        }
        submitText='Сохранить' />

      <PopupWithForm
        name='add-post'
        isOpen={isOpenPopup.isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClose}
        title='Новое место'
        children={(
          <>
            <section className="popup__form-section">
              <input required placeholder="Название" type="text" name="name"
                className="popup__input popup__input_margin_big" minLength="2" maxLength="30" />
              <span className="popup__input-error" id="post-text-error"></span>
            </section>
            <section className="popup__form-section">
              <input type="url" required placeholder="Ссылка на картинку" name="link"
                className="popup__input" />
              <span className="popup__input-error" id="link-error"></span>
            </section>
          </>)
        }
        submitText='Сохранить' />

      {/* <PopupWithForm
        name='delete'
        isOpen={isDeletePopupOpen}
        title='Вы уверены?'
        submitText='Да' />  */}
      
    </div>
  );
}

export default App;
