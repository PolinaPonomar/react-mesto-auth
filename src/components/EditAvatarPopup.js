import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const inputRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateAvatar({
          avatar: inputRef.current.value,
        });
    }

    useEffect( () => {
        if(!props.isOpen) { // каждый раз при закрытии поп-апа обнуляем поле ввода
            inputRef.current.value = '';
        }
    }, [props.isOpen] )

    return (
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose}>
            <input id="avatar-link-input" ref={inputRef} type="url" className="form__item" name="link" required placeholder="Ссылка на фото"/>
            <span id="avatar-link-input-error" className="form__item-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
