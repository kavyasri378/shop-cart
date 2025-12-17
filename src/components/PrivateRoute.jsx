import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const logIn = sessionStorage.getItem("LogIn");
  const role = sessionStorage.getItem("Role");

  if (logIn !== "true") {
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
