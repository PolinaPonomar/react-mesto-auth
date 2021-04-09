import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
    const location = useLocation().pathname; // определяем, на какой странице находимся
    const text = (location === "/sign-in") ? "Регистрация" : "Войти";
    const link = (location === "/sign-in") ? "/sign-up" : "/sign-in";

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип сайта"/>
            <nav className="navbar">
                {props.loggedIn ?
                    (<>
                        {!props.isMenuPopupOpen ?
                            (<button className="navbar__open-menu-button" onClick={props.onOpenMenuPopup}></button>)
                        :   (<button className="navbar__close-menu-button" onClick={props.onCloseMenuPopup}></button>)
                        }
                        <p className="navbar__email">{props.email}</p>
                        <Link to="" onClick={props.onSignOut} className="navbar__link">Выйти</Link>
                    </>) 
                : (<Link to={link} className="navbar__link navbar__link_visible">{text}</Link>)
                }
            </nav>
        </header>
    );
}

export default Header;
