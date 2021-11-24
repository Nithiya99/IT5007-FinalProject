import React, { Component } from "react";
import { businessIsAuthenticated } from "../../authentication";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      business: "",
      redirectToSignin: false,
    };
  }

  init = (businessId) => {
    const token = businessIsAuthenticated().token;
    // read(businessId, token).then((data) => {
    //   if (data.error) {
    //     this.setState({ redirectToSignin: true });
    //   } else {
    //     this.setState({ business: data });
    //   }
    // });
  };

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default Dashboard;
