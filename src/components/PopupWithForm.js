function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="button" aria-label="close" className="popup__close-button" onClick={props.onClose}></button>
                <form className="popup__form" name={`${props.name}-form`} onSubmit={props.onSubmit} noValidate>
                    <h2 className="popup__header">{props.title}</h2>
                    {props.children}
                    <button type="submit" className="popup__save-button">Сохранить</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
