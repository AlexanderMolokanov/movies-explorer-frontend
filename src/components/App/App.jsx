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
  apSetUser as apiSetUser,
  getSavedCards as apiGetSavedCards,
  saveCard as apiSaveCard,
  deleteSavedCard as apiDeleteSavedCard,
} from "../../utils/apii";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
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
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});
  const [likedFilms, setLikedMovies] = useState([]);
  const [isSuccesRegistr, setIsSuccesRegistr] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isSpiner, setIsSpiner] = useState(false);

  // const [isInfoTooltip, setIsInfoTooltip] = useState({
  //   isOpen: false,
  //   successful: true,
  //   text: '',
  // });

  // setIsInfoTooltip({
  //   isOpen: true,
  //   successful: false,
  //   text: err,
  // })

  // setIsInfoTooltip({
  //   isOpen: true,
  //   successful: true,
  //   text: 'Добро пожаловать!',
  // });

  // аутентификация
  useEffect(
    () => {
      apiGetUser()
        .then((profileInfo) => {
          console.log("profileInfo");
          console.log(profileInfo);
          console.log("localStorage.getItem");
          const sdfs = localStorage.getItem("login") === "true";
          console.log(sdfs);
          if (profileInfo && sdfs) {
            // localStorage.removeItem("allFilms");
            // setUser(profileInfo);
            setIsLogged(true);
          }
          history.push(path);
        })
        .catch((err) => {
          console.log(err);
          // if (err) {
          //   setIsLogged(false);
          // }
        });
    },
    [
      path, history
    ]
  );

  useEffect(() => {
    console.log("isLogged: ");
    console.log(isLogged);
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
    } else {
    }
  }, [isLogged, history]);

  //регистрация
  function handleRegistration({ name, email, password }) {
    apiSignup(name, email, password)
      .then((res) => {
        if (res) {
          handleAuthorization({ email, password });

          apiGetUser()
            .then((profileInfo) => {
              setUser(profileInfo);
            })
            .catch((err) => {
              console.log(err);
            });
        }
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
          localStorage.setItem("login", true);
          setIsSuccesRegistr(true);
          setIsSuccessful(true);
          setIsPopup(true);
          // console.log("localStorage.setItem")
          // console.log((localStorage.getItem("login") === "true"))
          // (localStorage.getItem("shortFilms") === "true")
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

  // useEffect(() => {
  //   const userDatas = user;
  //   console.log("userDatas")
  //   console.log(userDatas)
  //   console.log(userDatas.out === false)
  //   if (userDatas.out === false) {
  //         apiGetUser()
  //           .then((profileInfo  ) => {
  //             if (profileInfo) {
  //               // localStorage.removeItem("allFilms");
  //               // setUser(profileInfo);
  //               // setIsLogged(true);
  //             }
  //             // history.push(path);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //   }
  // }, [user]
  // );

  function handleUserUpdate(newData) {
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

  function handleSave(film) {
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

  function todoUnauthorized(err) {
    if (err === "Error: 401") {
      toDoSignOut();
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
        todoUnauthorized(err);
      });
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closePopup();
      }
    }
    if (isPopup) {
      document.addEventListener("keydown", closeByEscape);
    } else {
      document.removeEventListener("keydown", closeByEscape);
    }
  }, [isPopup]);

  const handlePopupClose = (e) => {
    if (
      e.type === "keydown" ||
      e.target.classList.contains("popup_opened") ||
      e.target.classList.contains("popup__cl-button")
    ) {
      closePopup();
    }
  };

  // Выход
  const toDoSignOut = () => {
    setIsLogged(false);
    // setUser("");
    setUser({});
    // setUser((prev) => {
    //   return { ...prev, out: true };
    // });
    localStorage.removeItem("films");
    localStorage.removeItem("filmsSearch");
    localStorage.removeItem("shortFilms");
    localStorage.removeItem("allFilms");
    localStorage.removeItem("login");
    setIsSuccesRegistr(false);
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
                <Register onRegister={handleRegistration} isSpiner={isSpiner} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <ProtectedRoute
              path="/movies"
              likedFilms={likedFilms}
              loggedIn={isLogged}
              onCardDelete={handleCardDelete}
              component={Movies}
              handleLikeClick={handleSave}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/saved-movies"
              likedFilms={likedFilms}
              loggedIn={isLogged}
              onCardDelete={handleCardDelete}
              component={SavedMovies}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/profile"
              signOut={toDoSignOut}
              onUpdateUser={handleUserUpdate}
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
            onClose={handlePopupClose}
            isSuccessful={isSuccessful}
            isSuccesRegistr={isSuccesRegistr}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
