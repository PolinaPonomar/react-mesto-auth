function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="button" aria-label="close" className="popup__close-button" onClick={props.onClose}></button>
                <div className="popup__form-background">
                    <form className="form" name={`${props.name}-form`} onSubmit={props.onSubmit} noValidate>
                        <h2 className="form__header">{props.title}</h2>
                        {props.children}
                        <button type="submit" className="form__save-button">Сохранить</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PopupWithForm;
