function ImagePopup(props) {

    return (
        <div onClick={props.onOverlayClose} className={`popup popup_view-post ${props.isOpen ? 'popup_opened' : ''}`}>
            <figure className="popup__img-container">
                <button onClick={props.onClose} aria-label="Закрыть модальное окно" type="button" className="popup__close-button"></button>
                <img className="popup__image"
                    src={props.card?.link ?? '#'}
                    alt={props.card?.name ?? '#'} />
                <figcaption className="popup__img-title">{props.card?.name ?? ''}</figcaption>
            </figure>
        </div>
    )


}

export default ImagePopup