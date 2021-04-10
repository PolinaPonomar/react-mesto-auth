import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
    // подписка на контекст информации о юзере
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleChangeName(event) {
        setName(event.target.value);
    }
    function handleChangeDescription(event) {
        setDescription(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name: name,
            about: description,
          });
    }

    // Эффект, вызываемый при монтировании компонента и при обновлении информации о юзере
    useEffect(() => {
        if (currentUser.name) { // избегаем ситуации, когда данные пользователя еще не получены от сервера ( чтобы в стейты не записать undifined)
            setName(currentUser.name);
        }
        if (currentUser.about) {
            setDescription(currentUser.about);
        }
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm name="profile" title="Редактировать профиль" isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose}>
            <input id="name-input" type="text" value={name} onChange={handleChangeName} className="form__item form__item_value_name" name="name" minLength={2} maxLength={40} required placeholder="Имя"/>
            <span id="name-input-error" className="form__item-error"></span>
            <input id="description-input" type="text" value={description} onChange={handleChangeDescription} className="form__item form__item_value_description" name="description"  minLength={2} maxLength={200} required placeholder="О себе"/>
            <span id="description-input-error" className="form__item-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
