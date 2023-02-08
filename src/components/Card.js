function Card(props) {

  function handleClick() {
    props.onCardClick(props);
  }

  return (
    <article aria-label="Карточка с фото" className="element" id={props.id}>
      <button className="element__delete-button" aria-label="Удалить пост" type="button"></button>
      <img onClick={handleClick} src={props.link} alt={props.name} className="element__image" />
      <div className="element__container">
        <h2 className="element__description">{props.name}</h2>
        <div className="element__column">
          <button aria-label="Лайк" type="button" className="element__like-button"></button>
          <p className="element__like-counter">{props.likes}</p>
        </div>
      </div>
    </article>
  )
}

export default Card