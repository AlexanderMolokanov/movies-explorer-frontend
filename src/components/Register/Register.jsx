import React from "react";
import "../Form/Form.css";
import Form from "../Form/Form";
import useForm from "../hooks/useForm";
import { EMAIL_CHECK, USERNAME_CHECK } from "../../utils/config";

function Register({ onRegister, isSpiner }) {
  const { enteredValues, errors, handleChange, isFormValid } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    });
  }

  return (
    <Form
      link="/signin"
      title="Добро пожаловать!"
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
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
          value={enteredValues.name || ""}
          pattern={USERNAME_CHECK}
        />
        <span className="form__input-error">{errors.name}</span>
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
          pattern={EMAIL_CHECK}
          value={enteredValues.email || ""}
        />
        <span className="form__input-error">{errors.email}</span>
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
          value={enteredValues.password || ""}
        />
        <span className="form__input-error">{errors.password}</span>
      </label>
    </Form>
  );
}

export default Register;
