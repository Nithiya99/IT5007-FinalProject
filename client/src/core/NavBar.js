import React from "react";
import { Link, withRouter } from "react-router-dom";

// Component Imports
import { businessSignout, businessIsAuthenticated } from "../authentication";

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
          {!businessIsAuthenticated() && (
            <>
              <li className="nav-item">
                <Link to="/business/signin">Merchant Login</Link>
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
