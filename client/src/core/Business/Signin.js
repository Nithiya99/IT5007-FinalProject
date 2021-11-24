import React, { Component } from "react";
import { Redirect } from "react-router";

// Own imports
import { businessSignin, businessAuthenticate } from "../../authentication";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      businessEmail: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { businessEmail, password } = this.state;
    const business = { businessEmail, password };
    // console.log(business);
    businessSignin(business).then((data) => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        businessAuthenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  render() {
    const { businessEmail, password, error, redirectToReferer, loading } =
      this.state;

    if (redirectToReferer) {
      return <Redirect to="/business/dashboard" />;
    }

    return (
      <div className="container mt-5">
        <h1>Business Login</h1>
        <div
          className="alert alert-danger mb-5 col-sm-8 offset-2"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}
        <form>
          <div className="form-group">
            <label className="lead" htmlFor="Business Email">
              Business Email
            </label>
            <input
              type="email"
              className="form-control"
              onChange={this.handleChange("businessEmail")}
              value={businessEmail}
            />
          </div>
          <div className="form-group">
            <label className="lead" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={this.handleChange("password")}
              value={password}
            />
          </div>
          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Signin;
