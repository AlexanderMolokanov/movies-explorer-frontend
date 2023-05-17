import React, { useState, useEffect } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import {
  signup as apiSignup,
  signin as apiSignin,
  getUser as apiGetUser,
  setUser as apiSetUser,
  getSavedCards as apiGetSavedCards,
  saveCard as apiSaveCard,
  deleteSavedCard as apiDeleteSavedCard,
} from "../../utils/apii";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Popup from "../Popup/Popup";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;
  const [isPopup, setIsPopup] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isSpiner, setIsSpiner] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [likedMovies, setLikedMovies] = useState([]);
  const [user, setUser] = useState({});

  //регистрация
  function handleRegistration({ name, email, password }) {
    apiSignup(name, email, password)
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch((err) => {
        setIsPopup(true);
        console.log(err);
      });
  }

  //авторизация
  function handleAuthorization({ email, password }) {
    setIsSpiner(true);
    apiSignin(email, password)
      .then((res) => {
        if (res) {
          setIsLogged(true);
          history.push("./movies");
        }
      })
      .catch((err) => {
        setIsPopup(true);
        console.log(err);
      })
      .finally(() => {
        setIsSpiner(false);
      });
  }

  // аутентификация
  useEffect(() => {
    const userDatas = user;
    console.log(userDatas)
    if (userDatas) {
      apiGetUser()
        .then((res) => {
          if (res) {
            localStorage.removeItem("allFilms");
            setIsLogged(true);
          }
          history.push(path);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, history, path]);

  useEffect(() => {
    if (isLogged) {
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
  }, [isLogged, history]);

  function handleUpdateUser(newUserInfo) {
    setIsSpiner(true);
    apiSetUser(newUserInfo)
      .then((data) => {
        setUser(data);
        setIsSuccessful(true);
        setIsPopup(true);
      })
      .catch((err) => {
        setIsPopup(true);
        console.log(err);
        handleUnauthorized(err);
      })
      .finally(() => {
        setIsSpiner(false);
      });
  }

  function handleCardLike(card) {
    apiSaveCard(card)
      .then((newMovie) => {
        setLikedMovies([newMovie, ...likedMovies]);
      })
      .catch((err) => {
        setIsPopup(true);
        console.log(err);
        handleUnauthorized(err);
      });
  }

  function handleUnauthorized(err) {
    if (err === "Error: 401") {
      handleSignOut();
    }
  }

  function handleCardDelete(card) {
    apiDeleteSavedCard(card._id)
      .then(() => {
        setLikedMovies((state) =>
          state.filter((item) => item._id !== card._id)
        );
      })
      .catch((err) => {
        setIsPopup(true);
        console.log(err);
        handleUnauthorized(err);
      });
  }

  // Выход
  const handleSignOut = () => {
    setIsLogged(false);
    localStorage.removeItem("films");
    localStorage.removeItem("filmsSearch");
    localStorage.removeItem("shortFilms");
    localStorage.removeItem("allFilms");
    // setUser("")
    history.push("/");
  };

    // Закрыть попар
  function closePopup() {
    setIsPopup(false);
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
              <PageNotFound />
            </Route>
          </Switch>
          <Popup
            isPopup={isPopup}
            onClose={closePopup}
            isSuccessful={isSuccessful}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
