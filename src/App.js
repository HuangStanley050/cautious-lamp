import React, { useState } from "react";
import NavBar from "./NavBar";
import Routes from "./Routes";
import "./App.css";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  function handleLogout() {
    userHasAuthenticated(false);
  }
  return (
    <div className="App container">
      <NavBar isAuthenticated={isAuthenticated} logOut={handleLogout} />
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default App;
