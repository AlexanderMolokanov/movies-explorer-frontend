import photo from "../../images/aMan.jpg";
import React from "react";

export default function AboutMe() {
  return (
    <section className="my" id="my">
      <h1 className="my__title">Студент</h1>
      <div className="my__container">
        <div className="my__content">
          <h2 className="my__large-title">Потрах Сучьевич</h2>
          <p className="my__info">Студент Яндекса, 65 лет</p>
          <p className="my__description">
            Пиво мое все. Никогда не поздно начать все сначала. Прошел школу Яндекса. Теперь буду кодить. 
          </p>
          <a
            href="https://github.com/AlexanderMolokanov"
            className="my__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={photo} alt="фото" className="my__photo" />
      </div>
    </section>
  );
}