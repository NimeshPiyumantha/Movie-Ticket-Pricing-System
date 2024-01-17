import { useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/SignIn/SignIn";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.employeeEntries.isAuthenticated
  );

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return isLoggedIn && isAuthenticated ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <SignIn onLogin={handleLogin} />
  );
}

export default App;