import okIcon from'../images/ok_icon.svg';
import errorIcon from'../images/error_icon.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_tip ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="button" aria-label="close" className="popup__close-button popup__close-button_type_tip" onClick={props.onClose}></button>
                <div className="popup__form-background popup__form-background_type_tip">
                    {props.isRegistrationSuccessful ?
                        (<>
                            <div className="popup__tip-icon" style={{ backgroundImage: `url(${okIcon})` }}></div>
                            <p className="popup__tip-text">Вы успешно зарегистрировались!</p>
                        </>)
                    :   (<>
                            <div className="popup__tip-icon" style={{ backgroundImage: `url(${errorIcon})` }}></div>
                            <p className="popup__tip-text">Что-то пошло не так! Попробуйте ещё раз.</p>
                        </>)
                }
                </div>
            </div>
        </div>
    );
}

export default InfoTooltip;
