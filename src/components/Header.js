import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
    const location = useLocation().pathname;
    const text = (location === "/sign-in") ? "Регистрация" : "Войти";
    const link = (location === "/sign-in") ? "/sign-up" :  "/sign-in";

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип сайта"/>
            <nav className="navbar">
                {props.loggedIn ?
                    (<>
                        <input type="checkbox" className="navbar__menu" id="menu"/>
                        <label className="menu-lable" htmlFor="menu">
                            <hr className="menu-lable__item"></hr>
                            <hr className="menu-lable__item"></hr>
                            <hr className="menu-lable__item"></hr>
                        </label>
                        <p className="navbar__email">{props.email}</p>
                        <Link to="" onClick={props.onSignOut} className="navbar__link">Выйти</Link>
                    </>) 
                : (<Link to={link} className="navbar__link navbar__link_active">{text}</Link>)
                }
            </nav>
        </header>
    );
}

export default Header;
