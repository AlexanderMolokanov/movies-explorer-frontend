import React from 'react';
import './InfoTooltip.css'; 

function InfoTooltip({ onClose, isSuccess, isUserUpdate }) {
  return (
    <div className={`popup ${!isSuccess ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          id="success-cl-button"
          type="button"
          className="popup__cl-button"
          onClick={onClose}
        />
        <h2 className="popup__signup-title">{`${
          isUserUpdate ? 'Редактирование прошло успешно!' : 'Что-то пошло не так! Попробуйте ещё раз.'
        }`}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
