import "./PageNotFound.css";

export default function PageNotFound({ goBack }) {
  return (
    <main className="wrong-address">
      <p className="wrong-address__text-container">
        <span className="wrong-address__error">404</span>
        <span className="wrong-address__error-name">Страница не найдена</span>
      </p>
      <button className="wrong-address__button" onClick={goBack}>
        Назад
      </button>
    </main>
  );
}
