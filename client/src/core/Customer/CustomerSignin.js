import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { customerAuthenticate, customerSignin } from "../../authentication";

class CutomerSignin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
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
    const { email, password } = this.state;
    const customer = { email, password };
    // console.log(customer);
    customerSignin(customer).then((data) => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        customerAuthenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  render() {
    const { email, password, error, redirectToReferer, loading } = this.state;
    if (redirectToReferer) {
      return <Redirect to="/customer/dashboard" />;
    }
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <span>
              <h1>Customer Login</h1>
              <p>
                Don't have an acount?
                <Link to="/customer/signup">Signup here.</Link>
              </p>
            </span>
          </div>
          <div className="col">
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
                <label htmlFor="" className="lead">
                  User Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={this.handleChange("email")}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="" className="lead">
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
        </div>
      </div>
    );
  }
}

export default CutomerSignin;
