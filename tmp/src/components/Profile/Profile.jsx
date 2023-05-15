import React, { useEffect, useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Profile.css';
import Header from '../Header/Header';
import useForm from '../hooks/useForm';
import { USERNAME_CHECK } from '../../utils/constants';

function Profile({ signOut, onUpdateUser, loggedIn, isSpiner }) {
  const user = useContext(CurrentUserContext);

  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();
  const [isLastValues, setIsLastValues] = useState(false);

  useEffect(() => {
    if (user) {
      resetForm(user);
    }
  }, [user, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    });
  }

  useEffect(() => {
    if (user.name === enteredValues.name && user.email === enteredValues.email) {
      setIsLastValues(true);
    } else {
      setIsLastValues(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredValues]);

  return (
    <>
      <Header loggedIn={loggedIn} />
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
              value={enteredValues.name || ''}
              pattern={USERNAME_CHECK}
            />
            <span className="profile__input-error">{errors.name}</span>
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
              value={enteredValues.email || ''}
            />
            <span className="profile__input-error">{errors.email}</span>
          </label>
          <button
            type="submit"
            disabled={!isFormValid ? true : false}
            className={
              !isFormValid || isSpiner || isLastValues
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

export default Profile;
