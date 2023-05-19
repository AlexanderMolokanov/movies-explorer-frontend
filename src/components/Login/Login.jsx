import useFormWithValidation from "../../hooks/useFormWithValidation";
import React from "react";
import RegForm from "../RegForm/RegForm";

function Login({ onAuthorize, isSpiner }) {
  const { inputValues, error, todoChange, isValid } = useFormWithValidation();
  function todoSubmit(evt) {
    evt.preventDefault();
    onAuthorize({
      email: inputValues.email,
      password: inputValues.password,
    });
  }
  return (
    <RegForm
      title="Рады Вас видеть!"
      buttonText="  Войти"
      question="Еще не зарегистрированы?"
      linkText=" Регистрация"
      link="/signup"
      onSubmit={todoSubmit}
      isDisabled={!isValid}
      isSpiner={isSpiner}
    >
      <label className="form__field">
        E-mail
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="email"
          required
          onChange={todoChange}
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
          onChange={todoChange}
          value={inputValues.password || ""}
        />
        <span className="form__input-error">{error.password}</span>
      </label>
    </RegForm>
  );
}

export default Login;
