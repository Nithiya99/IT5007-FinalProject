import React from "react";
import { Link, withRouter } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

// Component Imports
import {
  businessSignout,
  businessIsAuthenticated,
  customerIsAuthenticated,
  customerSignout,
} from "../authentication";

const NavBar = ({ history }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <Link to="/" className="navbar-brand">
        MerriMe
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {!businessIsAuthenticated() && !customerIsAuthenticated() && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/business/signin">
                  Merchant Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/customer/signin">
                  Customer Login
                </Link>
              </li>
            </>
          )}
          {customerIsAuthenticated() && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/customer/dashboard">
                  Dashboard
                </Link>
              </li>
              <NavDropdown title="Services" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/photographyService">Photography</Link>
                </NavDropdown.Item>
                <NavDropdown.Item disabled href="#action/3.2">
                  Wedding Dresses
                </NavDropdown.Item>
                <NavDropdown.Item disabled href="#action/3.3">
                  Make-Up
                </NavDropdown.Item>
              </NavDropdown>
              <li className="nav-item">
                <Link
                  to={`/customer/${customerIsAuthenticated().customer._id}`}
                  className="nav-link"
                >
                  {`${customerIsAuthenticated().customer.username}'s Profile`}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/customer/cart/${
                    customerIsAuthenticated().customer._id
                  }`}
                  className="nav-link"
                >
                  My Cart
                </Link>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => customerSignout(() => history.push("/"))}
                >
                  Sign Out
                </span>
              </li>
            </>
          )}
          {businessIsAuthenticated() && (
            <>
              <li className="nav-item">
                <Link to="/business/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/business/${businessIsAuthenticated().business._id}`}
                  className="nav-link"
                >
                  {`${
                    businessIsAuthenticated().business.businessName
                  }'s Profile`}
                </Link>
              </li>

              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => businessSignout(() => history.push("/"))}
                >
                  Sign Out
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
