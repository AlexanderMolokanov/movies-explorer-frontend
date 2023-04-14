import React from 'react';
import './Portfolio.css';
import arrow from '../../images/Arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav className="portfolio__list">
        <a
          href="https://alexandermolokanov.github.io/how-to-learn/"
          className="portfolio__link portfolio__link-border"
          target="_blank"
          rel="noreferrer">
          <p className="portfolio__text">Статичный сайт</p>
          <img className="portfolio__image" src={arrow} alt="стрелка" />
        </a>
        <a
          href="https://alexandermolokanov.github.io/russian-travel/index.html"
          className="portfolio__link portfolio__link-border"
          target="_blank"
          rel="noreferrer">
          <p className="portfolio__text">Адаптивный сайт</p>
          <img className="portfolio__image" src={arrow} alt="стрелка" />
        </a>
        <a
          href="https://github.com/AlexanderMolokanov/react-mesto-api-full"
          className="portfolio__link"
          target="_blank"
          rel="noreferrer">
          <p className="portfolio__text">Одностраничное приложение</p>
          <img className="portfolio__image" src={arrow} alt="стрелка" />
        </a>
      </nav>
    </section>
  );
}

export default Portfolio;
