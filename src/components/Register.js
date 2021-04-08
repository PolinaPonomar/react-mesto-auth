import { useState} from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth.js';

function Register(props) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); 
    // думать про InfoTooltip

    function handleChangePassword (event) {
        setPassword(event.target.value);
    }
    function handleChangeEmail (event) {
        setEmail(event.target.value);
    }

    function handleSubmit (event) {
        event.preventDefault();
        auth.register({password, email})
            .then((res) => {  // думать про InfoTooltip
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        // // Передаём значения управляемых компонентов во внешний обработчик
        // props.onRegister({password, email});
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__header form__header_type_enter-page">Регистрация</h2>
                <input id="email-input" type="email" value={email} onChange={handleChangeEmail} className="form__item form__item_type_enter-page" name="email" required placeholder="Email"/>
                <span id="email-input-error" className="form__item-error"></span>
                <input id="password-input" type="password" value={password} onChange={handleChangePassword} className="form__item form__item_type_enter-page" name="password" required placeholder="Пароль"/>
                <span id="password-input-error" className="form__item-error"></span>
                <button type="submit" className="form__save-button form__save-button_type_enter-page">Зарегистрироваться</button>
            </form>
            <div className="redirection">
                <p className="redirection__text">Уже зарегистрированы?&nbsp;</p>
                <Link to="/sign-in" className="redirection__link">Войти</Link>
            </div>
        </>
    );
}

export default Register;
