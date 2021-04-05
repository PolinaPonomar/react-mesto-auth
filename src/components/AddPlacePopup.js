import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName (event) {
        setName(event.target.value)
    }
    function handleChangeLink (event) {
        setLink(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onAddPlace({
            name, // эквивалентно name: name
            link // link: link 
        });
    }

    useEffect( () => {
        if(!props.isOpen) { // каждый раз при закрытии поп-апа обнуляем поля ввода
            setName('');
            setLink('');
        }
    }, [props.isOpen] )

    return (
        <PopupWithForm name="cards" title="Новое место" isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose}>
            <input id="place-name-input" type="text" value={name} onChange={handleChangeName} className="form__item form__item_value_place-name" name="title" minLength={2} maxLength={30} required placeholder="Название"/>
            <span id="place-name-input-error" className="form__item-error"></span>
            <input id="link-input" type="url" value={link} onChange={handleChangeLink} className="form__item form__item_value_link" name="link" required placeholder="Ссылка на картинку"/>
            <span id="link-input-error" className="form__item-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
