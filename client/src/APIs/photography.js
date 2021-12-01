export const listAllPhotography = () => {
  return fetch("http://localhost:5000/api/service/photography/all", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const tutorial7 = () => {
  return fetch("http://localhost:5000/api/service/photography/tut7", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listPhotographyByBiz = (businessId) => {
  return fetch(
    "http://localhost:5000/api/service/photography/by/" + `${businessId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          JSON.parse(
            localStorage.getItem("businessJWT")
          ).businessToken.toString(),
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const photographyDetail = (photographyId) => {
  // console.log(photographyId);
  return fetch(
    "http://localhost:5000/api/service/photography/" + `${photographyId}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const addPhotography = (businessId, photography) => {
  return fetch(
    "http://localhost:5000/api/service/photography/new/" + `${businessId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          JSON.parse(
            localStorage.getItem("businessJWT")
          ).businessToken.toString(),
      },
      body: JSON.stringify(photography),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
