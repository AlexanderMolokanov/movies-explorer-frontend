import NavTab from '../NavTab/NavTab';
import React from 'react';
import cercles from "../../images/text__COLOR_landing-logo.svg";

export default function Promo() {
  return (
    <section className="promo" id="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        {/* <NavTab /> */}
        {/* <div className="promo__cercles"> */}
        {/* <img src={logo} alt="логотип" /> */}
        <img className="promo__cercles" src={cercles} alt="круги" />
        {/* </div> */}
      </div>
    </section>
  );
}
