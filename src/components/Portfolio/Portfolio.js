import React from 'react';
import './Portfolio.css';

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
          <div className="portfolio__image">
            
          </div>
         
        </a>
        <a
          href="https://alexandermolokanov.github.io/russian-travel/index.html"
          className="portfolio__link portfolio__link-border"
          target="_blank"
          rel="noreferrer">
          <p className="portfolio__text">Адаптивный сайт</p>
         
        </a>
        <a
          href="https://github.com/AlexanderMolokanov/react-mesto-api-full"
          className="portfolio__link"
          target="_blank"
          rel="noreferrer">
          <p className="portfolio__text">Одностраничное приложение</p>
         
        </a>
      </nav>
    </section>
  );
}

export default Portfolio;
