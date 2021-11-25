export const listAllPhotography = () => {
  return fetch("http://localhost:5000/api/service/photography/all", {
    method: "GET",
  })
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
