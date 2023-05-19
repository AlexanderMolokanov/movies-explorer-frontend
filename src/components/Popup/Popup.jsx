export default function Popup({
  isPopup,
  isSuccessful,
  isSuccesRegistr,
  onClose,
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
            <h3 className="popup__signup-title">{`${
              isSuccessful
                ? "Вход осуществлен успешно!"
                : "Что-то пошло не так! Попробуйте ещё раз."
            }`}</h3>
          ) : (
            <h3 className="popup__signup-title">{`${
              isSuccessful
                ? "Редактирование прошло успешно!"
                : "Что-то пошло не так! Попробуйте ещё раз."
            }`}</h3>
          )}
        </>
      </div>
    </div>
  );
}
