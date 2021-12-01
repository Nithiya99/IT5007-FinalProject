import React, { Component } from "react";
import { Link } from "react-router-dom";

// Own imports
import { businessSignup } from "../../authentication";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      businessName: "",
      businessEmail: "",
      businessAddress: "",
      businessHp: "",
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
    const {
      businessName,
      businessEmail,
      businessAddress,
      businessHp,
      password,
    } = this.state;
    const business = {
      businessName,
      businessEmail,
      businessAddress,
      businessHp,
      password,
    };
    console.log(business);
    businessSignup(business).then((data) => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        this.setState({
          businessName: "",
          businessEmail: "",
          businessAddress: "",
          businessHp: "",
          password: "",
          loading: false,
          success: true,
        });
      }
    });
  };
  render() {
    const {
      businessName,
      businessEmail,
      businessAddress,
      businessHp,
      password,
      error,
      loading,
      success,
    } = this.state;

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <span>
              <h1>Business sign up</h1>
              <p>Register your business here.</p>
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
              <Link to="/business/signin">Sign In</Link>.
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
                <label className="lead" htmlFor="Business Name">
                  Business Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange("businessName")}
                  value={businessName}
                />
              </div>
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
                <label className="lead" htmlFor="Business Address">
                  Business Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange("businessAddress")}
                  value={businessAddress}
                />
              </div>
              <div className="form-group">
                <label className="lead" htmlFor="Business Conatct">
                  Business Contact
                </label>
                <input
                  type="number"
                  className="form-control"
                  onChange={this.handleChange("businessHp")}
                  value={businessHp}
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
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
