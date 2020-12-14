import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import playGame from "./phaser/mainGame";

//console.log(App);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
