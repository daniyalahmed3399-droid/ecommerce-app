import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  // Get the currently logged-in user
  const { user } = useAuth();

  /*
    If there is no logged-in user,
    send them to the login page.
  */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /*
    If the user is logged in,
    allow the requested page to appear.
  */
  return children;
}

export default ProtectedRoute;