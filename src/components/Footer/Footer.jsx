
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h1 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h1>
        <div className="footer__navigation">
          <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
          <ul className="footer__links-list">
            <li>
              <a
                href="https://practicum.yandex.ru/"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                href="https://github.com/AlexanderMolokanov"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
