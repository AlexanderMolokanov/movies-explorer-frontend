import React from 'react';
import photo from '../../images/myphoto.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__content">
          <h3 className="about-me__large-title">Александр</h3>
          <p className="about-me__info">Фронтенд-разработчик, 35 лет</p>
          <p className="about-me__description">
            Работаю в Ценртальном институте авиационного моторостроения им. П.И. Баранова (г. Москва). Закончил Российский государственный университет нефти и газа имени И.М. Губкина и Национальный исследовательский университет "МЭИ". Защитил кандидатскую диссертацию. Люблю горные лыжи, ролики
            и езду на спортивных автомобилях. Благодаря курсу Веб-разработчик в Яндекс Практикуме приобрел новый полезный опыт реализации классных проктов в области фронтенд и бэкенд разработки.
          </p>
          <a
            href="https://github.com/Andryuha-Nikolaev"
            className="about-me__link"
            target="_blank"
            rel="noreferrer">
            Github
          </a>
        </div>
        <img src={photo} alt="фото" className="about-me__photo" />
      </div>
    </section>
  );
}

export default AboutMe;
