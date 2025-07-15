import { Navigate, useLocation } from "react-router-dom";
//import { useAuth } from "../context/AuthContext"; // ← however you store auth state

export default function RequireAuth({ children }) {
  //const { user } = useAuth(); // null/undefined when logged‑out
  const location = useLocation(); // for redirecting back after login
  const user = false;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children; // if authenticated → render outlet
}
