import React from "react";
import { Route, Switch } from "react-router-dom";

// Components Imports
import LandingPage from "./core/LandingPage";
import Signup from "./core/Business/Signup";
import Signin from "./core/Business/Signin";
import NavBar from "./core/NavBar";
import Dashboard from "./core/Business/Dashboard";
import Profile from "./core/Business/Profile";

function MainRouter(props) {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>

        {/* Business Routes */}
        <Route exact path="/business/signup" component={Signup}></Route>
        <Route exact path="/business/signin" component={Signin}></Route>
        <Route exact path="/business/dashboard/" component={Dashboard}></Route>
        <Route exact path="/business/:businessId/" component={Profile}></Route>
      </Switch>
    </div>
  );
}

export default MainRouter;
