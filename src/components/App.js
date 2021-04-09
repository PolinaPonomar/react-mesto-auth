import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import PopupWithForm from './PopupWithForm';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';

function App() {
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [isInfoTooltipOpen,setIsInfoTooltipOpen] = useState(false); //описать, когда открывать
    const [isRegistrationSuccessful, setRegistrationSuccessful] = useState(false);

    const [currentUser, setCurrentUser] = useState({});
    const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen,setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen,setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard,setSelectedCard] = useState({isOpen: false, link: '', name: ''});
    const [cards,setCards] = useState([]);

    // Эффект, вызываемый при монтировании компонента
    useEffect( () => {
        tokenCheck(); // проверка на наличие токена в локальном хранилище
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
        setIsInfoTooltipOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({isOpen: false});
    }

    // блок работы с регистрацией, аутентификацией и авторизацией
    const handleRegister = (inputs) => {
        auth.register(inputs)
            .then((data) => {
                if (data) { // если с данными все ок
                    setRegistrationSuccessful(true);
                    setIsInfoTooltipOpen(true);
                    history.push('/sign-in');
                }
            })
            .catch((err) => {
                setRegistrationSuccessful(false);
                setIsInfoTooltipOpen(true);
                console.log(err);
            });
    }

    const handleLogin = (inputs) => {
        auth.authorize(inputs)
            .then((data) => { 
                if (data.token) { //проверяем, есть ли у пришедших данных токен
                    localStorage.setItem('jwt', data.token); // сохраняем токен пользователя
                    setLoggedIn(true); // открываем в аккаунт пользователя
                    history.push('/') //переходим на аккаунт пользователя
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const tokenCheck = () => {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            if (jwt) { //если с токеном все ок  
                auth.getContent(jwt)
                .then((data) => {
                    console.log(data.data.email);
                    if (data.data.email) { //проверяем, есть ли у пришедших данных емайл
                        setEmail(data.data.email); // заполняем емайл в шапке аккаунта пользователя
                        setLoggedIn(true); // открываем в аккаунт пользователя
                        history.push('/') //переходим на аккаунт пользователя
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        }
    }

    // блок работы после авторизации
    const handleUpdateUser = (inputs) => {
        api.setUserInfo(inputs)
            .then((updateUser) => {
                setCurrentUser(updateUser);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleUpdateAvatar = (inputAvatar) => {
        api.changeAvatar(inputAvatar)
            .then((updateUser) => {
                setCurrentUser(updateUser);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleCardLike = (card) => {
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

    const handleCardDelete = (card) => {
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

    const handleAddPlaceSubmit = (card) => {
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
                <Header loggedIn={loggedIn} email={email}/>
                <Switch>
                    <ProtectedRoute
                        exact path="/"
                        loggedIn={loggedIn}
                        component={Main} 
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick} 
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                    <Route path="/sign-in">
                        <Login onLogin={handleLogin}/>
                    </Route>
                    <Route path="/sign-up">
                        <Register onRegister={handleRegister}/>
                    </Route>
                    <Route> {/* если переходит по любому пути? */}
                        {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                    </Route>
                </Switch>
                <Footer/>

                <InfoTooltip isOpen={isInfoTooltipOpen} isRegistrationSuccessful={isRegistrationSuccessful} onClose={closeAllPopups}/>

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
