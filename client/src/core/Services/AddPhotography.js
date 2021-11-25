import React, { Component } from "react";
import { Link } from "react-router-dom";
import { addPhotography } from "../../APIs/photography";
import { businessIsAuthenticated } from "../../authentication";

class AddPhotography extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      price: "",
      image: "",
      error: "",
      loading: false,
      success: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickAdd = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { title, description, price, image } = this.state;
    const photography = { title, description, price, image };
    console.log(JSON.parse(localStorage.getItem("businessJWT")).businessToken);
    addPhotography(businessIsAuthenticated().business._id, photography).then(
      (data) => {
        if (data.error) {
          this.setState({ error: data.error, loading: false });
        } else {
          this.setState({
            title: "",
            description: "",
            price: "",
            image: "",
            error: "",
            loading: false,
            success: true,
          });
        }
      }
    );
  };

  render() {
    const { title, description, price, image, error, success } = this.state;
    return (
      <div className="container-fluid mt-4">
        <div className="row justify-content-md-center">
          <div className="col-md-10">
            <h3 className="pb-3">Add Photography Package</h3>
            <div className="row justify-content-md-center">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-body">
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
                      Photography service successfully Added! Click here to go
                      back to dashboard
                      <Link to="/business/dashboard">Click Me!</Link>.
                    </div>
                    <form>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Service Type
                        </label>
                        <div className="col-sm-10">
                          <input
                            readOnly
                            type="text"
                            value="Photography"
                            className="form-control-plaintext"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Package Name
                        </label>
                        <div className="col-sm-10">
                          <input
                            required
                            type="text"
                            placeholder="Enter a title for your photography service"
                            className="form-control"
                            onChange={this.handleChange("title")}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Description
                        </label>
                        <div className="col-sm-10">
                          <input
                            required
                            type="text"
                            placeholder="Please provide the detaild here"
                            className="form-control"
                            onChange={this.handleChange("description")}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Image</label>
                        <div className="col-sm-10">
                          <input
                            required
                            type="text"
                            placeholder="Please provide the url for image"
                            className="form-control"
                            onChange={this.handleChange("image")}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Price</label>
                        <div className="col-sm-10">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                $
                              </span>
                            </div>
                            <input
                              type="text"
                              required
                              className="form-control"
                              placeholder="Price"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              onChange={this.handleChange("price")}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={this.clickAdd}
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPhotography;
