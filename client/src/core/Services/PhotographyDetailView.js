import React, { Component } from "react";
import moment from "moment";
import { photographyDetail } from "../../APIs/photography";
import { customerIsAuthenticated, getBusiness } from "../../authentication";

class PhotographyDetailView extends Component {
  constructor() {
    super();
    this.state = {
      photographyService: [],
      url: window.location.pathname,
    };
  }

  componentDidMount() {
    photographyDetail(
      this.state.url.substring(this.state.url.lastIndexOf("/") + 1).toString()
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ photographyService: data });
      }
    });
  }

  renderDetails = (photographyService) => (
    <div className="container">
      {console.log(photographyService.serviceBy)}
      <div className="card">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              style={{ width: "inherit" }}
              src={photographyService.image}
              alt=""
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">{photographyService.title}</h3>
              <p className="text-muted">
                {moment(photographyService.created).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </p>
              <p className="card-text">{photographyService.description}</p>
              <p className="lead">${photographyService.price}</p>
              {customerIsAuthenticated() && (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      console.log(
                        photographyService._id,
                        customerIsAuthenticated().customer._id
                      );
                    }}
                  >
                    Add to cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <div className="container mt-3">
        <h1 className="pd-4">Photography Details</h1>
        {this.renderDetails(this.state.photographyService)}
      </div>
    );
  }
}

export default PhotographyDetailView;
