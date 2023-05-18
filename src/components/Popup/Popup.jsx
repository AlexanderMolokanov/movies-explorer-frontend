// import React, { useEffect }from "react";
// 


export default function Popup({
  onClose,
  isPopup,
  isSuccessful,
  isSuccesRegistr,
}) {
  
  // const handleEscClose = (e) => e.key === "Escape" && onClose(e);
  // useEffect(() => { 
  //   if (isPopup) {
  //     document.addEventListener("keydown", handleEscClose);
  //   }
  //   return () => document.removeEventListener("keydown", handleEscClose);
  // }, [isPopup]); 

  return (
    <div className={`popup ${isPopup ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          id="success-cl-button"
          type="button"
          className="popup__cl-button"
          onClick={onClose}
        />
        <>
          {isSuccesRegistr ? (
            <h2 className="popup__signup-title">{`${
              isSuccessful
                ? "Вход осуществлен успешно!"
                : "Что-то пошло не так! Попробуйте ещё раз."
            }`}</h2>
          ) : (
            <h2 className="popup__signup-title">{`${
              isSuccessful
                ? "Редактирование прошло успешно!"
                : "Что-то пошло не так! Попробуйте ещё раз."
            }`}</h2>
          )}
        </>
        
      </div>
    </div>
  );
}
