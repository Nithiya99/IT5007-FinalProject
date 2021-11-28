import React, { Component } from "react";
import { Button, Badge } from "react-bootstrap";
import { Basket2Fill, HeartFill } from "react-bootstrap-icons";
import { listAllPhotography } from "../../APIs/photography";

class PhotographyCustomerView extends Component {
  constructor() {
    super();
    this.state = {
      photographyServices: [],
    };
  }

  componentDidMount() {
    listAllPhotography().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ photographyServices: data.photographies });
      }
    });
  }
  renderPhotography = (photographyServices) => (
    <div className="row row-cols-1 row-cols-md-5">
      {console.log(photographyServices)}
      {photographyServices.map((item, i) => (
        <div className="col mb-4" key={i}>
          <div className="card">
            <img
              className="card-img-top"
              style={{ height: "150px" }}
              src={item.image}
              alt={item.title}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <div style={{ height: "125px", overflow: "auto" }}>
                <p className="card-text">{item.description}</p>
              </div>

              <p className="lead">${item.price}</p>
              <span className="d-flex">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    alert("Feature Coming Soon...");
                  }}
                >
                  <HeartFill />
                </button>
                <button className="btn btn-info mx-auto">View Details</button>
                <button className="btn btn-warning ml-auto">
                  <Basket2Fill />
                </button>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  render() {
    return (
      <div className="container-fluid mt-4">
        <div className="row justify-content-md-center">
          <div className="col-md-10">
            <h1 className="pb-3">Photography Service Listings</h1>
            <Button variant="info" className="mb-3">
              Photography Packages{" "}
              <Badge bg="secondary">
                {this.state.photographyServices.length}
              </Badge>
            </Button>
            {this.renderPhotography(this.state.photographyServices)}
          </div>
        </div>
      </div>
    );
  }
}

export default PhotographyCustomerView;
