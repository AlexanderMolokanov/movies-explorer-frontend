// import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...props }) {
  console.log("props.isLogged");
  console.log(props.loggedIn);
  return (
    <Route>
      {() => (props.loggedIn ? <Component {...props} /> : <Redirect to="/" />)}
    </Route>
  );
}

// import React from "react";
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children, ...props }) {
//     return props.isLogged ? children : <Navigate replace to="/" />;
// }
// export default ProtectedRoute;





// import { Navigate } from 'react-router-dom';

// function ProtectedRoute({children, loggedIn}) {
//     if (loggedIn) {
//         return (
//             children
//         )
//     }

//     return (
//         <Navigate to="/" />
//     )
// }

// export default ProtectedRoute;


// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({loggedIn, children}) => {
//   return loggedIn ? children : <Navigate to="/"/>;
// };

// export default ProtectedRoute;

