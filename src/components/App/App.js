import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
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
import { FILMS, PROFILE } from "../../utils/constants";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import * as api from "../../utils/MainApi";

// console.log(api)

function App() {
  const history = useHistory();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const path = location.pathname;
  const [isSaved, setSaved] = useState(false);
  const profileInfo =
    // console.log(Movies)

    useEffect(() => {
    
    }, []);

  // isLoggedIn = true
  useEffect(() => {
    if (isLoggedIn) {

      function getCardss(FILMS) {
        setCurrentUser(PROFILE);
        setSavedMovies(FILMS);
        // console.log(FILMS);
      }
      getCardss(FILMS);
    } else {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, history]);

  function handleRegister({ name, email, password }) {
    console.log("handleRegister", name, email, password);
   
  }

  //авторизация пользователя
  function handleAuthorize({ email, password }) {
    console.log("handleAuthorize", email, password);
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api
      .setUserInfo(newUserInfo)
      .then((data) => {
        setIsUpdate(true);
        setCurrentUser(data);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
        handleUnauthorized(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  

  function handleCardLike(card) {
    api
      .postCard(card)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
        handleUnauthorized(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setSavedMovies((state) =>
          state.filter((item) => item._id !== card._id)
        );
      })
      .catch((err) => {
        setIsSuccess(false);
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
    setIsLoggedIn(true);
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("movieSearch");
    localStorage.removeItem("shortMovies");
    localStorage.removeItem("allMovies");
    history.push("/");
  };

  function closeUnsuccessPopup() {
    setIsSuccess(true);
    setIsUpdate(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Switch>
            <Route path="/" exact>
              <Header loggedIn={!isLoggedIn} />
              <Main />
              <Footer />
            </Route>
            <Route path="/signin">
              <Login onAuthorize={handleAuthorize} isLoading={isLoading} />
             
            </Route>
            <Route path="/signup">
              <Register onRegister={handleRegister} isLoading={isLoading} />
             
            </Route>
           
            <Route
              path="/movies"
              savedMovies={savedMovies}
              loggedIn={isLoggedIn}
              onCardDelete={handleCardDelete}
              component={Movies}
              handleLikeClick={handleCardLike}
            ></Route>
           
            <Route
              path="/saved-movies"
              savedMovies={savedMovies}
              loggedIn={isLoggedIn}
              onCardDelete={handleCardDelete}
              component={SavedMovies}
            ></Route>
           
            <Route
              path="/profile"
              signOut={handleSignOut}
              onUpdateUser={handleUpdateUser}
              loggedIn={isLoggedIn}
              component={Profile}
              isLoading={isLoading}
            ></Route>
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
          <InfoTooltip isSuccess={isSuccess} onClose={closeUnsuccessPopup} />
          <InfoTooltip
            isSuccess={!isUpdate}
            isUpdate={isUpdate}
            onClose={closeUnsuccessPopup}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
