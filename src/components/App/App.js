import React, { useState, useEffect } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as api from "../../utils/MainApi";

function App() {
  const history = useHistory();
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});
  const [likedMovies, setLikedMovies] = useState([]);
  const [isTooltip, setIsTooltip] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isSpiner, setIsSpiner] = useState(false);
  const path = location.pathname;

  //регистрация
  function handleRegistration({ name, email, password }) {
    api
      .signup(name, email, password)
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch((err) => {
        setIsTooltip(false);
        console.log(err);
      });
  }

  //авторизация
  function handleAuthorization({ email, password }) {
    setIsSpiner(true);
    api
      .signin(email, password)
      .then((res) => {
        if (res) {
          setIsLogged(true);
          history.push("./movies");
        }
      })
      .catch((err) => {
        setIsTooltip(false);
        console.log(err);
      })
      .finally(() => {
        setIsSpiner(false);
      });
  }

  // аутентификация
  useEffect(() => {
    const userDatas = user;
    if (userDatas) {
      api
        .getUser()
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies");
            setIsLogged(true);
          }
          history.push(path);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
      api
        .getUser()
        .then((profileInfo) => {
          setUser(profileInfo);
        })
        .catch((err) => {
          console.log(err);
        });
      api
        .getSavedCards()
        .then((cardsData) => {
          setLikedMovies(cardsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLogged, history]);

  function handleUpdateUser(newUserInfo) {
    setIsSpiner(true);
    api
      .setUser(newUserInfo)
      .then((data) => {
        setUser(data);
        setIsSuccessful(true);
        setIsTooltip(true);
      })
      .catch((err) => {
        setIsTooltip(false);
        console.log(err);
        handleUnauthorized(err);
      })
      .finally(() => {
        setIsSpiner(false);
      });
  }

  function handleCardLike(card) {
    api
      .saveCard(card)
      .then((newMovie) => {
        setLikedMovies([newMovie, ...likedMovies]);
      })
      .catch((err) => {
        setIsTooltip(false);
        console.log(err);
        handleUnauthorized(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteSavedCard(card._id)
      .then(() => {
        setLikedMovies((state) =>
          state.filter((item) => item._id !== card._id)
        );
      })
      .catch((err) => {
        setIsTooltip(false);
        console.log(err);
        handleUnauthorized(err);
      });
  }

  function handleUnauthorized(err) {
    if (err === "Error: 401") {
      handleSignOut();
    }
  }

  // Выход
  const handleSignOut = () => {
    setIsLogged(false);
    localStorage.removeItem("movies");
    localStorage.removeItem("movieSearch");
    localStorage.removeItem("shortMovies");
    localStorage.removeItem("allMovies");
    history.push("/");
  };

  function closeUnsuccessPopup() {
    setIsTooltip(false);
    setIsSuccessful(false);
  }

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="page">
        <div className="page__content">
          <Switch>
            <Route path="/" exact>
              <Header loggedIn={isLogged} />
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
                <Register onRegister={handleRegistration} isSpiner={isSpiner} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <ProtectedRoute
              path="/movies"
              likedMovies={likedMovies}
              loggedIn={isLogged}
              onCardDelete={handleCardDelete}
              component={Movies}
              handleLikeClick={handleCardLike}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/saved-movies"
              likedMovies={likedMovies}
              loggedIn={isLogged}
              onCardDelete={handleCardDelete}
              component={SavedMovies}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/profile"
              signOut={handleSignOut}
              onUpdateUser={handleUpdateUser}
              loggedIn={isLogged}
              component={Profile}
              isSpiner={isSpiner}
            ></ProtectedRoute>
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
          <InfoTooltip
            isTooltip={isTooltip}
            // isTooltip={isSuccessful}
            onClose={closeUnsuccessPopup}
            isSuccessful={isSuccessful}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
