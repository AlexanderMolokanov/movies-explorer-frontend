import React from 'react';
import Form from '../Form/Form';
import useForm from '../hooks/useForm';

function Login({ onAuthorize, isSpiner }) {
  const { inputValues, error, handleChange, isValid } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onAuthorize({
      email: inputValues.email,
      password: inputValues.password,
    });
  }

  return (
    <Form
      title="Рады видеть!"
      buttonText="  Войти"
      question="Еще не зарегистрированы?"
      linkText=" Регистрация"
      link="/signup"
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      isSpiner={isSpiner}>
      <label className="form__field">
        E-mail
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="email"
          required
          onChange={handleChange}
          value={inputValues.email || ''}
        />
        <span className="form__input-error">{error.email}</span>
      </label>
      <label className="form__field">
        Пароль
        <input
          name="password"
          className="form__input"
          id="password-input"
          type="password"
          required
          onChange={handleChange}
          value={inputValues.password || ''}
        />
        <span className="form__input-error">{error.password}</span>
      </label>
    </Form>
  );
}

export default Login;
