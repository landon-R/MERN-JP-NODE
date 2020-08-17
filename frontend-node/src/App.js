import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Switch>
          <Route />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
