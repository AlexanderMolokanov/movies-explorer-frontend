import React, { useEffect, useContext, useState } from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import useFormWithValidation from '../../hooks/useFormWithValidation';

export default function Profile({ signOut, onUpdateUser, isLogged, isSpiner }) {
  const user = useContext(CurrentUserContext);

  const { inputValues, error, handleChange, isValid, resetForm } = useFormWithValidation();
  const [isLastValues, setItLastValues] = useState(false);

  useEffect(() => {
    if (user) {
      resetForm(user);
    }
  }, [user, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: inputValues.name,
      email: inputValues.email,
    });
  }

  useEffect(() => {
    if (user.name === inputValues.name && user.email === inputValues.email) {
      setItLastValues(true);
    } else {
      setItLastValues(false);
    }
  }, [inputValues]);

  return (
    <>
      <Header isLogged={isLogged} />
      <section className="profile">
        <h3 className="profile__title">Привет, {user.name}!</h3>
        <form id="form" className="profile__form" onSubmit={handleSubmit} noValidate>
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
              onChange={handleChange}
              value={inputValues.name || ''}
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
              onChange={handleChange}
              value={inputValues.email || ''}
            />
            <span className="profile__input-error">{error.email}</span>
          </label>
          <button
            type="submit"
            disabled={!isValid ? true : false}
            className={
              !isValid || isSpiner || isLastValues
                ? 'profile__button-save form__button-save_inactive'
                : 'profile__button-save'
            }>
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