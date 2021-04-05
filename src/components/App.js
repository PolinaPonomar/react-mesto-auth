import { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen,setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen,setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard,setSelectedCard] = useState({isOpen: false, link: '', name: ''});
    const [cards,setCards] = useState([]);

    // Эффект, вызываемый при монтировании компонента
    useEffect( () => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([dataUserInfo, dataCards]) => {
                // Добавление информации о пользователе с сервера на страницу:
                setCurrentUser(dataUserInfo); // поля объекта: avatar, name, about, _id и cohort
                // Добавление существующих на сервере карточек на страницу:
                setCards(dataCards);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [] )

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };
    const handleCardClick = (card) => {
        setSelectedCard({isOpen: true, link: card.link,name: card.name });
    };
    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);

        setSelectedCard({isOpen: false});
    }

    function handleUpdateUser (inputs) {
        api.setUserInfo(inputs)
            .then((updateUser) => {
                setCurrentUser(updateUser);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateAvatar (inputAvatar) {
        api.changeAvatar(inputAvatar)
            .then((updateUser) => {
                setCurrentUser(updateUser);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleCardLike (card) {
        // Проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(liker => liker._id === currentUser._id);
        if (!isLiked) {
            api.putLike(card._id)
                .then((newCard) => { // получили данные лайкнутой карточки (лайк уже проставлен)
                    // в cards записываем новый массив, который получен так:
                    // в текущем массиве перебираем карточки и когда id одной из карточек совпадает с id нашей карточки,
                    // менем ее на новую (с лайком)
                    setCards((state) => state.map((item) => item._id === card._id ? newCard : item)); // state - это текущий стейт (т.е необновленный cards)
                })
                .catch((err) => {
                    console.log(err);
                })

        } else {
            api.deleteLike(card._id)
                .then((newCard) => { //аналогично
                    setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    function handleCardDelete (card) {
        // Определяем, являемся ли мы владельцем карточки
        const isOwn = card.owner._id === currentUser._id;
        if (isOwn) {
            api.deleteCard(card._id)
                .then((answer) => {
                    setCards((state) => state.filter((item) => item._id !== card._id));
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    function handleAddPlaceSubmit (card) {
        api.postNewCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        < CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header/>
                <Switch>
                    <Route exact path="/"> 
                        {!loggedIn && <Redirect to="/sign-in" /> }
                        <Main onEditAvatar={handleEditAvatarClick}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick} 
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}/>
                    </Route>
                    <Route path="/sign-in">
                        {/* <Login/> */}
                    </Route>
                    <Route path="/sign-up">
                        {/* <Register/> */}
                    </Route>
                </Switch>
                <Footer/>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups}/>
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} onClose={closeAllPopups}/>
                <AddPlacePopup  isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups}/>

                <PopupWithForm name="confirm" title="Вы уверены?"/>

                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
