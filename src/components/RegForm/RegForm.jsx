import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo_new.svg";

export default function RegForm({
  buttonText,
  children,
  isDisabled,
  isSpiner,
  question,
  link,
  linkText,
  onSubmit,
  title,
}) {
  return (
    <div className="form__container">
      <Link to="/" className="form__logo">
        <img src={logo} alt="логотип" />
      </Link>
      <h2 className="form__title">{title}</h2>
      <form className="form" id="form" onSubmit={onSubmit} noValidate>
        {children}
        <button
          type="submit"
          disabled={isDisabled ? true : false}
          className={
            isDisabled || isSpiner
              ? "form__button-save form__button-save_inactive"
              : "form__button-save"
          }
        >
          {buttonText}
        </button>
      </form>
      <p className="form__text">
        {question}
        <Link to={link} className="form__link">
          {linkText}
        </Link>
      </p>
    </div>
  );
}
