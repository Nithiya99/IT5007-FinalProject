import React, { Component } from "react";
import { Pencil, Trash } from "react-bootstrap-icons";
import { customerIsAuthenticated } from "../../authentication";

class CustomerProfile extends Component {
  render() {
    return (
      <div className="container pt-5">
        <h1>User Profile</h1>
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <div className="card mt-3">
              <div className="card-body">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th>Username</th>
                      <td>{customerIsAuthenticated().customer.username}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{customerIsAuthenticated().customer.email}</td>
                    </tr>
                  </tbody>
                </table>
                <span className="d-flex">
                  <button className="btn btn-light ">
                    Delete Account <Trash size={15} />
                  </button>
                  <button className="btn btn-primary ml-auto">
                    Edit Profile <Pencil size={15} />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerProfile;
