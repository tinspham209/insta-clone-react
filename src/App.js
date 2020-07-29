import React from "react";
import "./App.css";
import Posts from "./components/Posts/Posts";

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
          className="app__headerImage"
        />
      </div>
      <h1>Header</h1>
      <Posts />
    </div>
  );
}

export default App;
