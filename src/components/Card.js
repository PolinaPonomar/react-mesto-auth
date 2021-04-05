import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    // Подписка на контекст информации о юзере
    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = `card__delete-button ${isOwn && 'card__delete-button_visible'}`;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(liker => liker._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_active'}`; 
    

    function handleClick() { //При клике на карточку в конечном счете сработает handleCardClick из компонента App
        props.onCardClick(props.card); // (handleCardClick "проброшен" пропсом onCardClick из App через Main сюда)
    }
    function handleLikeClick() {
        props.onCardLike(props.card);
    }
    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }  

    return (
        <article className="card">
            <div className="card__photo" style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick}/>
            <div className="card__photo-info">
                <h2 className="card__text">{props.card.name}</h2>
                <div className="card__like-container">
                    <button type="button" aria-label="like" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="card__likes-number">{props.card.likes.length}</p>
                </div>
            </div>
            <button type="button" aria-label="delete" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        </article>
    );
}

export default Card;
