// This will prevent non-authenticated users from accessing this route
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.profile);

if (token !== null) {
  return children
} else {
  return <Navigate to="/login" />
}
}

export default PrivateRoute
