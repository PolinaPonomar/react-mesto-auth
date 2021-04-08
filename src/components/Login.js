function Login() {
    return (
        <form className="form" noValidate>
            <h2 className="form__header form__header_type_enter-page">Вход</h2>
            <input id="email-input" type="email" className="form__item form__item_type_enter-page" name="email" required placeholder="Email"/>
            <span id="email-input-error" className="form__item-error"></span>
            <input id="password-input" type="password" className="form__item form__item_type_enter-page" name="password" required placeholder="Пароль"/>
            <span id="password-input-error" className="form__item-error"></span>
            <button type="submit" className="form__save-button form__save-button_type_enter-page">Войти</button>
        </form>
    );
}

export default Login;
