import React from 'react';
import photo from '../../images/my-photo.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="my" id="my">
      <h2 className="my__title">Студент</h2>
      <div className="my__container">
        <div className="my__content">
          <h3 className="my__large-title">Александр</h3>
          <p className="my__info">Ученый-программист, 35 лет</p>
          <p className="my__description">
          Я работаю в Центральном институте авиационного моторостроения им.&nbsp;П.И.&nbsp;Баранова (г. Москва). Закончил Российский государственный университет нефти и&nbsp;газа имени И.М.&nbsp;Губкина и&nbsp;Национальный исследовательский университет "МЭИ". Защитил кандидатскую диссертацию. Увлекаюсь горными лыжами, роликами, люблю быструю езду на&nbsp;спортивных автомобилях. Благодаря учебному курсу приобрел опыт реализации классных проектов в&nbsp;области HTML-, CSS- и&nbsp;JS-разработки.
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
