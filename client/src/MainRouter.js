import React from "react";
import { Route, Switch } from "react-router-dom";

// Components Imports
import LandingPage from "./core/LandingPage";
import Signup from "./core/Business/Signup";
import Signin from "./core/Business/Signin";
import NavBar from "./core/NavBar";
import Dashboard from "./core/Business/Dashboard";
import Profile from "./core/Business/Profile";
import AddPhotography from "./core/Services/AddPhotography";
import CustomerSignin from "./core/Customer/CustomerSignin";
import CustomerSignup from "./core/Customer/CustomerSignup";
import CustomerDashboard from "./core/Customer/CustomerDashboard";
import CustomerProfile from "./core/Customer/CustomerProfile";
import PhotographyCustomerView from "./core/Services/PhotographyCustomerView";
import Cart from "./core/Customer/Cart";

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
        <Route
          exact
          path="/business/photography/add"
          component={AddPhotography}
        ></Route>

        {/* Customer Routes */}
        <Route exact path="/customer/signin" component={CustomerSignin}></Route>
        <Route exact path="/customer/signup" component={CustomerSignup}></Route>
        <Route
          exact
          path="/customer/dashboard"
          component={CustomerDashboard}
        ></Route>
        <Route
          exact
          path="/customer/:customerId"
          component={CustomerProfile}
        ></Route>
        <Route exact path="/customer/cart/:customerId" component={Cart}></Route>
        <Route
          exact
          path="/photographyService"
          component={PhotographyCustomerView}
        ></Route>
      </Switch>
    </div>
  );
}

export default MainRouter;
