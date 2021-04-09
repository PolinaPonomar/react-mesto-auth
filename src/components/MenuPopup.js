import { Link} from 'react-router-dom';

function MenuPopup(props) {

    return (
        <div className={`navbar__popup-menu ${props.isOpen && 'navbar__popup-menu_opened' }`}>
            <p className="navbar__email navbar__email_visible">{props.email}</p>
            <Link to="" onClick={props.onSignOut} className="navbar__link navbar__link_visible navbar__link_popup-menu">Выйти</Link>
        </div>
    );
}

export default MenuPopup;
