import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate("/login")
  }
  return (
    <>
      <h1 className="text-6xl">You're Already LoggedIn</h1>
    </>
  )
}

export default App
