import {
  signup as apiSignup,
  signin as apiSignin,
  getUser as apiGetUser,
  apSetUser as apiSetUser,
  getSavedCards as apiGetSavedCards,
  saveCard as apiSaveCard,
  deleteSavedCard as apiDeleteSavedCard,
} from "../../utils/apii";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Popup from "../Popup/Popup";
import SavedMovies from "../SavedMovies/SavedMovies";
import React, { useState, useEffect } from "react";
import Register from "../Register/Register";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  const [likedFilms, setLikedMovies] = useState([]);
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("logged") === "true"
  );
  const [isSuccesRegistr, setIsSuccesRegistr] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isSpiner, setIsSpiner] = useState(false);
  const [user, setUser] = useState({});

  //авторизация
  function handleAuthorization({ email, password }) {
    setIsSpiner(true);
    // console.log("handleAuthorization-apiSignin-");
    apiSignin(email, password)
      .then((res) => {
        if (res) {
          console.log(res);
          setIsLogged(true);
          localStorage.setItem("logged", true);
          setIsSuccesRegistr(true);
          setIsSuccessful(true);
          setIsPopup(true);
          history.push("./movies");
        }
      })
      .catch((err) => {
        setIsPopup(true);
        setIsSuccessful(false);
        console.log(err);
      })
      .finally(() => {
        setIsSpiner(false);
      });
  }

  // аутентификация
  useEffect(() => {
    if (isLogged) {
      setIsLogged(true);
      console.log("setIsLogged-true -аутентификация");
      console.log(isLogged);

      apiGetUser()
        .then((profileInfo) => {
          setUser(profileInfo);
        })
        .catch((err) => {
          console.log(err);
        });
      apiGetSavedCards()
        .then((cardsData) => {
          setLikedMovies(cardsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLogged]);

  //регистрация
  function todoRegistration({ name, email, password }) {
    apiSignup(name, email, password)
      .then((res) => {
        if (res) {
          handleAuthorization({ email, password });
        }
      })
      .catch((err) => {
        setIsPopup(true);
        console.log(err);
      });
  }

  // обновить пользователя
  function todoUserUpdate(newData) {
    setIsSpiner(true);
    apiSetUser(newData)
      .then((userData) => {
        setIsSuccesRegistr(false);
        setIsSuccessful(true);
        setIsPopup(true);
        setUser(userData);
      })
      .catch((err) => {
        setIsPopup(true);
        console.log(err);
        todoUnauthorized(err);
      })
      .finally(() => {
        setIsSpiner(false);
      });
  }

  // выход при отсутствии авторизации
  function todoUnauthorized(err) {
    if (err === "Error: 401") {
      toDoSignOut();
    }
  }

  // сохранить карточку с фильмом
  function todoLikeClick(film) {
    apiSaveCard(film)
      .then((newfilm) => {
        setLikedMovies([newfilm, ...likedFilms]);
      })
      .catch((err) => {
        setIsPopup(true);
        console.log(err);
        todoUnauthorized(err);
      });
  }

  // удалить сохраненную карточку
  function todoCardDelete(card) {
    apiDeleteSavedCard(card._id)
      .then(() => {
        setLikedMovies((state) =>
          state.filter((item) => item._id !== card._id)
        );
      })
      .catch((err) => {
        setIsPopup(true);
        console.log(err);
        todoUnauthorized(err);
      });
  }

  // Закрыть попар
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closePopup();
      }
    }
    function closeByClik(evt) {
      if (evt.target.classList.contains("popup_opened")) {
        closePopup();
      }
    }
    if (isPopup) {
      document.addEventListener("keydown", closeByEscape);
      document.addEventListener("click", closeByClik);
    } else {
      document.removeEventListener("keydown", closeByEscape);
    }
  }, [isPopup]);

  const todoPopupClose = (e) => {
    if (
      e.type === "keydown" ||
      e.target.classList.contains("popup_opened") ||
      e.target.classList.contains("popup__cl-button")
    ) {
      closePopup();
    }
  };

  function closePopup() {
    setIsPopup(false);
    setIsSuccessful(false);
  }

  // Выход
  const toDoSignOut = () => {
    localStorage.removeItem("films");
    localStorage.removeItem("filmsSearch");
    localStorage.removeItem("shortFilms");
    localStorage.removeItem("allFilms");
    localStorage.removeItem("logged");
    setIsLogged(false);
    setUser({});
    setIsSuccesRegistr(false);
    history.push("/");
  };

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="page">
        <div className="page__content">
          <Switch>
            <Route path="/" exact>
              <Header isLogged={isLogged} />
              <Main />
              <Footer />
            </Route>
            <Route path="/signin">
              {!isLogged ? (
                <Login onAuthorize={handleAuthorization} isSpiner={isSpiner} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/signup">
              {!isLogged ? (
                <Register onRegister={todoRegistration} isSpiner={isSpiner} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <ProtectedRoute
              path="/movies"
              likedFilms={likedFilms}
              isLogged={isLogged}
              onCardDelete={todoCardDelete}
              component={Movies}
              todoLikeClick={todoLikeClick}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/saved-movies"
              likedFilms={likedFilms}
              isLogged={isLogged}
              onCardDelete={todoCardDelete}
              component={SavedMovies}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/profile"
              signOut={toDoSignOut}
              onUpdateUser={todoUserUpdate}
              isLogged={isLogged}
              component={Profile}
              isSpiner={isSpiner}
            ></ProtectedRoute>
            <Route path="/*">
              <PageNotFound />
            </Route>
          </Switch>
          <Popup
            isPopup={isPopup}
            onClose={todoPopupClose}
            isSuccessful={isSuccessful}
            isSuccesRegistr={isSuccesRegistr}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
