import successIcon from '../images/Union.svg';
import errorIcon from '../images/Union_error.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button
            className="popup__container-close-button"
            type="button"
            onClick={onClose}
          />
        <img
          src={isSuccess ? successIcon : errorIcon}
          alt={
            isSuccess ? 'Регистрация прошла успешно' : 'Регистрация не прошла'
          }
          className="popup__signup-icon"
        />
        <h3 className="popup__signup-title">
          {isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h3>
      </div>
    </div>
  );
};

export default InfoTooltip;
