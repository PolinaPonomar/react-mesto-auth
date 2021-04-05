function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${props.card.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="button" aria-label="close" className="popup__close-button" onClick={props.onClose}></button>
                <img className='popup__photo' src={props.card.link} alt=''/>
                <p className="popup__photo-name">{props.card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;
