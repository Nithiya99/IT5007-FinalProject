import React, { Component } from "react";
import { Link } from "react-router-dom";
import { customerSignup } from "../../authentication";

class CustomerSignup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      error: "",
      loading: false,
      success: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { username, email, password } = this.state;
    const customer = { username, email, password };
    console.log(customer);
    customerSignup(customer).then((data) => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        this.setState({
          username: "",
          email: "",
          password: "",
          loading: false,
          success: true,
        });
      }
    });
  };

  render() {
    const { username, email, password, error, loading, success } = this.state;
    return (
      <div>
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <span>
                <h1>Customer sign up</h1>
                <p>Sign up here to start your wedding planning.</p>
              </span>
            </div>
            <div className="col">
              <div
                className="alert alert-danger mb-5 col-sm-8 offset-2"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
              <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
                New account successfully created! Please{" "}
                <Link to="/customer/signin">Signin</Link>.
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
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleChange("username")}
                    value={username}
                  />
                </div>
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
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerSignup;
