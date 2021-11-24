import React, { Component } from "react";
import { businessIsAuthenticated } from "../../authentication";

class Dashboard extends Component {
  render() {
    return (
      <div className="container mt-4">
        <h1>{businessIsAuthenticated().business.businessName}'s Dashboard</h1>
      </div>
    );
  }
}

export default Dashboard;
