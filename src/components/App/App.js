import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSuccess, setIsResult] = useState(true);
  const [isSpiner, setIsSpiner] = useState(false);
  const [isUserUpdate, setIsUserUpdate] = useState(false);
  const path = location.pathname;

  //регистрация
  function handleRegistration({ name, email, password }) {
    api
      .signup(name, email, password)
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch((err) => {
        setIsResult(false);
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
          setIsLoggedIn(true);
          history.push("./movies");
        }
      })
      .catch((err) => {
        setIsResult(false);
        console.log(err);
      })
      .finally(() => {
        setIsSpiner(false);
      });
  }

  // аутентификация
  useEffect(() => {
    const userDatas = currentUser;
    if (userDatas) {
      api
        .getUser()
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies");
            setIsLoggedIn(true);
          }
          history.push(path);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUser()
        .then((profileInfo) => {
          setCurrentUser(profileInfo);
        })
        .catch((err) => {
          console.log(err);
        });
      api
        .getSavedCards()
        .then((cardsData) => {
          setSavedMovies(cardsData.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, history]);

  function handleUpdateUser(newUserInfo) {
    setIsSpiner(true);
    api
      .setUser(newUserInfo)
      .then((data) => {
        setIsUserUpdate(true);
        setCurrentUser(data);
      })
      .catch((err) => {
        setIsResult(false);
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
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        setIsResult(false);
        console.log(err);
        handleUnauthorized(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteSavedCard(card._id)
      .then(() => {
        setSavedMovies((state) =>
          state.filter((item) => item._id !== card._id)
        );
      })
      .catch((err) => {
        setIsResult(false);
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
    setIsLoggedIn(false);
    localStorage.removeItem("movies");
    localStorage.removeItem("movieSearch");
    localStorage.removeItem("shortMovies");
    localStorage.removeItem("allMovies");
    history.push("/");
  };

  function closeUnsuccessPopup() {
    setIsResult(true);
    setIsUserUpdate(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Switch>
            <Route path="/" exact>
              <Header loggedIn={isLoggedIn} />
              <Main />
              <Footer />
            </Route>
            <Route path="/signin">
              {/* {!isLoggedIn ? ( */}
              <Login onAuthorize={handleAuthorization} isSpiner={isSpiner} />
              {/* ) : (
                <Redirect to="/" /> 
              )} */}
            </Route>
            <Route path="/signup">
              {/* {!isLoggedIn ? ( */}
              <Register onRegister={handleRegistration} isSpiner={isSpiner} />
              {/* ) : (
                <Redirect to="/" />
              )} */}
            </Route>
            <ProtectedRoute
              path="/movies"
              savedMovies={savedMovies}
              loggedIn={isLoggedIn}
              onCardDelete={handleCardDelete}
              component={Movies}
              handleLikeClick={handleCardLike}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/saved-movies"
              savedMovies={savedMovies}
              loggedIn={isLoggedIn}
              onCardDelete={handleCardDelete}
              component={SavedMovies}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/profile"
              signOut={handleSignOut}
              onUpdateUser={handleUpdateUser}
              loggedIn={isLoggedIn}
              component={Profile}
              isSpiner={isSpiner}
            ></ProtectedRoute>
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
          <InfoTooltip 
            isSuccess={isSuccess} 
            isSuccess={!isUserUpdate}
            onClose={closeUnsuccessPopup} 
            isUserUpdate={isUserUpdate}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
