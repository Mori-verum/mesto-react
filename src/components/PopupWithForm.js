function PopupWithForm(props) {

    return (
        <div onClick={props.onOverlayClose} className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <form name={props.name} noValidate className="popup__form">
                    <h2 className="popup__title">{props.title}</h2>
                    <button type="submit" className="popup__submit popup__submit_delete">{props.submitText}</button>
                </form>
                <button aria-label="Закрыть модальное окно" type="button" className="popup__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm