import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Badge, Tab, Button } from "react-bootstrap";
import { Pencil, Plus, Trash } from "react-bootstrap-icons";
import {
  listPhotographyByBiz,
  listAllPhotography,
} from "../../APIs/photography";
import { businessIsAuthenticated } from "../../authentication";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      photographyServices: [],
    };
  }

  componentDidMount() {
    // listAllPhotography().then((data) => {
    //   if (data.error) {
    //     console.log(data.error);
    //   } else {
    //     this.setState({ photographyServices: data.photographies });
    //   }
    // });
    listPhotographyByBiz(businessIsAuthenticated().business._id).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ photographyServices: data.photographies });
        }
      }
    );
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
                <button className="btn btn-warning">
                  Edit <Pencil size={15} />
                </button>
                <button className="btn btn-danger ml-auto">
                  Delete <Trash size={15} />
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
            {console.log(businessIsAuthenticated())}
            <h3 className="pb-4">
              {businessIsAuthenticated().business.businessName}'s Dashboard
            </h3>

            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <div className="card">
                <div className="card-header">
                  <Nav variant="pills">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Photography</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Make-Up</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Bridal Dresses</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fourth">Banquet Halls</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
                <div className="card-body">
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <span className="d-flex">
                        <Button variant="info" className="mb-3">
                          Photography Packages{" "}
                          <Badge bg="secondary">
                            {this.state.photographyServices.length}
                          </Badge>
                        </Button>
                        <Link
                          to="/business/photography/add"
                          className="ml-auto"
                        >
                          <strong>
                            Add <Plus size={20} />
                          </strong>
                        </Link>
                      </span>
                      {this.renderPhotography(this.state.photographyServices)}
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <p className="lead">Coming Soon...</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p className="lead">Coming Soon...</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                      <p className="lead">Coming Soon...</p>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </div>
            </Tab.Container>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
