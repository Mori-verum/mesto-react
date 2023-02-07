import { api } from "../utils/api.js"
import { useEffect, useState } from "react"
import Card from "./Card.js"

function Main(props) {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userDescription: '',
    userAvatar: ''
  })

  useEffect(() => {
    api.getDataProfile()
    .then((userData) => {
      setUserInfo({
        userName: userData.name,
        userDescription: userData.about,
        userAvatar: userData.avatar
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }, Object.keys(userInfo))

    return(
        <main>
      <section className ="profile">
        <div className ="profile__avatar-container">
        <div className ="profile__avatar-icon" onClick = {props.onEditAvatar}>
          <div aria-label="Изменить аватар" className ="profile__avatar-edit"></div>
        </div>
        <img src={userInfo.userAvatar} alt="Аватар" className ="profile__avatar-img" />
      </div>
        <div className ="profile__info">
          <h1 className ="profile__username">{userInfo.userName}</h1>
          <button aria-label="Изменить описание профиля" type="button" className ="profile__edit-button" onClick = {props.onEditProfile}></button>
          <p className ="profile__about">{userInfo.userDescription}</p>
        </div>
        <button aria-label="Добавить пост" type="button" className ="profile__add-button" onClick = {props.onAddPlace}></button>
      </section>
      <section className ="elements" aria-label="Посты">
        {props.cards.map(card => (
          <Card onCardClick = {props.onCardClick} key = {card._id} id = {card._id} name = {card.name} link = {card.link} likes = {card.likes.length} />
        ))}
      </section>
    </main>
    )
}

export default Main