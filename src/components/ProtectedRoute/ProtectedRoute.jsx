// import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...props }) {
  console.log("props.isLogged - ИН ПРОТЕКТЕД РОУТ");
  console.log(props.isLogged);
  return (
    <Route>
      {() => (props.isLogged ? <Component {...props} /> : <Redirect to="/" />)}
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

// function ProtectedRoute({children, isLogged}) {
//     if (isLogged) {
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

// const ProtectedRoute = ({isLogged, children}) => {
//   return isLogged ? children : <Navigate to="/"/>;
// };

// export default ProtectedRoute;

