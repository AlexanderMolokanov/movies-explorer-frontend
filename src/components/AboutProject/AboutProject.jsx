import React from "react";

function AboutProject() {
  return (
    <section className="project" id="about">
      <div className="project__container">
        <h1 className="project__title">О проекте</h1>
        <div className="project__content">
          <div className="project__info">
            <h2 className="project__info-header">
              Дипломный проект включал 5 этапов
            </h2>
            <p className="project__info-description">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="project__info">
            <h2 className="project__info-header">
              На выполнение диплома ушло 5 недель
            </h2>
            <p className="project__info-description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="project__time">
          <h2 className="project__time-header project__time-header_green">
            1 неделя
          </h2>
          <h2 className="project__time-header">4 недели</h2>
          <p className="project__time-description">Back-end</p>
          <p className="project__time-description">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
