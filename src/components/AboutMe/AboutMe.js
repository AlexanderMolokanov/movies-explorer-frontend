import React from 'react';
import photo from '../../images/myphoto.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="my" id="my">
      <h2 className="my__title">Студент</h2>
      <div className="my__container">
        <div className="my__content">
          <h3 className="my__large-title">Александр</h3>
          <p className="my__info">Фронтенд-разработчик, 35 лет</p>
          <p className="my__description">
            Работаю в Ценртальном институте авиационного моторостроения им. П.И. Баранова (г. Москва). Закончил Российский государственный университет нефти и газа имени И.М. Губкина и Национальный исследовательский университет "МЭИ". Защитил кандидатскую диссертацию. Люблю горные лыжи, ролики
            и езду на спортивных автомобилях. Благодаря курсу Веб-разработчик в Яндекс Практикуме приобрел новый полезный опыт реализации классных проктов в области фронтенд и бэкенд разработки.
          </p>
          <a
            href="https://github.com/AlexanderMolokanov"
            className="my__link"
            target="_blank"
            rel="noreferrer">
            Github
          </a>
        </div>
        <img src={photo} alt="фото" className="my__photo" />
      </div>
    </section>
  );
}

export default AboutMe;
