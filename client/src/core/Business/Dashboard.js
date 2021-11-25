import React, { Component } from "react";
import { businessIsAuthenticated, readBusiness } from "../../authentication";

class Dashboard extends Component {
  render() {
    return (
      <div className="container mt-4">
        {console.log(businessIsAuthenticated())}
        <h1>{businessIsAuthenticated().business.businessName}'s Dashboard</h1>
      </div>
    );
  }
}

export default Dashboard;
