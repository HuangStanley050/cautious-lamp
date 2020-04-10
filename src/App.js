import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";
import { onError } from "./libs/errorLib";
import NavBar from "./NavBar";
import Routes from "./Routes";
import "./App.css";

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);
    props.history.push("/login");
  }

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
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

export default withRouter(App);
