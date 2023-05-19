import React, { useEffect, useContext, useState } from "react";
import Header from "../Header/Header";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({ signOut, onUpdateUser, isLogged, isSpiner }) {
  const [isLastValues, setItLastValues] = useState(false);
  const user = useContext(CurrentUserContext);
  const { inputValues, error, todoChange, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    if (user) {
      resetForm(user);
    }
  }, [user, resetForm]);

  useEffect(() => {
    if (user.name === inputValues.name && user.email === inputValues.email) {
      setItLastValues(true);
    } else {
      setItLastValues(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues]);

  function todoSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: inputValues.name,
      email: inputValues.email,
    });
  }

  return (
    <>
      <Header isLogged={isLogged} />
      <section className="profile">
        <h1 className="profile__title">Привет, {user.name}!</h1>
        <form
          id="form"
          className="profile__form"
          onSubmit={todoSubmit}
          noValidate
        >
          <label className="profile__field">
            Имя
            <input
              name="name"
              className="profile__input"
              id="name-input"
              type="text"
              minLength="2"
              maxLength="40"
              required
              onChange={todoChange}
              value={inputValues.name || ""}
            />
            <span className="profile__input-error">{error.name}</span>
          </label>

          <div className="profile__border"></div>
          <label className="profile__field">
            E-mail
            <input
              name="email"
              className="profile__input"
              id="email-input"
              type="email"
              required
              onChange={todoChange}
              value={inputValues.email || ""}
            />
            <span className="profile__input-error">{error.email}</span>
          </label>
          <button
            type="submit"
            disabled={!isValid ? true : false}
            className={
              !isValid || isSpiner || isLastValues
                ? "profile__button-save form__button-save_inactive"
                : "profile__button-save"
            }
          >
            Редактировать
          </button>
          <button type="button" className="profile__logout" onClick={signOut}>
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  );
}
