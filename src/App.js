import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import NavBar from "./NavBar";
import Routes from "./Routes";
import "./App.css";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  function handleLogout() {
    userHasAuthenticated(false);
  }

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }
  return (
    !isAuthenticating && (
      <div className="App container">
        <NavBar isAuthenticated={isAuthenticated} logOut={handleLogout} />
        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
      </div>
    )
  );
}

export default App;
