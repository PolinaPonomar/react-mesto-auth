import { useState} from 'react';

function Login(props) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); 

    function handleChangePassword (event) {
        setPassword(event.target.value);
    }

    function handleChangeEmail (event) {
        setEmail(event.target.value);
    }

    function handleSubmit (event) {
        event.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onLogin({password, email});
    }

    return (
        <form className="form" onSubmit={handleSubmit} noValidate>
            <h2 className="form__header form__header_type_enter-page">Вход</h2>
            <input id="email-input" type="email" value={email} onChange={handleChangeEmail} className="form__item form__item_type_enter-page" name="email" required placeholder="Email"/>
            <span id="email-input-error" className="form__item-error"></span>
            <input id="password-input" type="password" value={password} onChange={handleChangePassword} className="form__item form__item_type_enter-page" name="password" required placeholder="Пароль"/>
            <span id="password-input-error" className="form__item-error"></span>
            <button type="submit" className="form__save-button form__save-button_type_enter-page">Войти</button>
        </form>
    );
}

export default Login;
