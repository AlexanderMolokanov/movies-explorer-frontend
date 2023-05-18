import React from "react";
import RegForm from "../RegForm/RegForm";
import useFormWithValidation from "../../hooks/useFormWithValidation";

function Register({ onRegister, isSpiner }) {
  const { inputValues, error, handleChange, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      name: inputValues.name,
      email: inputValues.email,
      password: inputValues.password,
    });
  }

  return (
    <RegForm
      link="/signin"
      title="Добро пожаловать!"
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      isSpiner={isSpiner}
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText=" Войти"
    >
      <label className="form__field">
        Имя
        <input
          name="name"
          className="form__input"
          id="name-input"
          type="text"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChange}
          value={inputValues.name || ""}
        />
        <span className="form__input-error">{error.name}</span>
      </label>
      <label className="form__field">
        E-mail
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="email"
          required
          onChange={handleChange}
          value={inputValues.email || ""}
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
          value={inputValues.password || ""}
        />
        <span className="form__input-error">{error.password}</span>
      </label>
    </RegForm>
  );
}

export default Register;
