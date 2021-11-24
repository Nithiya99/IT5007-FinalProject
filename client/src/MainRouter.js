import React from "react";
import { Route, Switch } from "react-router-dom";

// Components Imports
import LandingPage from "./core/LandingPage";

function MainRouter(props) {
  return (
    <div>
      <h1>Hello</h1>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
      </Switch>
    </div>
  );
}

export default MainRouter;
