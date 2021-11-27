import React, { Component } from "react";

import { customerIsAuthenticated } from "../../authentication";

class CustomerDashboard extends Component {
  render() {
    return (
      <div className="container-fluid mt-4">
        <div className="row justify-content-md-center">
          <div className="col-md-10">
            <h1>Dashboard</h1>
            <p className="lead">
              Welcome back {customerIsAuthenticated().customer.username}!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerDashboard;
