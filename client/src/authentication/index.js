// Business Authentication
export const businessSignup = (business) => {
  return fetch("http://localhost:5000/api/business/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(business),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const customerSignup = (customer) => {
  return fetch("http://localhost:5000/api/customer/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const businessSignin = (business) => {
  return fetch("http://localhost:5000/api/business/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(business),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const customerSignin = (customer) => {
  return fetch("http://localhost:5000/api/customer/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const businessAuthenticate = (businessJWT, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("businessJWT", JSON.stringify(businessJWT));
    next();
  }
};

export const customerAuthenticate = (customerJWT, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("customerJWT", JSON.stringify(customerJWT));
    next();
  }
};

export const businessIsAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("businessJWT")) {
    return JSON.parse(localStorage.getItem("businessJWT"));
  } else {
    return false;
  }
};

export const customerIsAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("customerJWT")) {
    return JSON.parse(localStorage.getItem("customerJWT"));
  } else {
    return false;
  }
};

export const readBusiness = (businessId, token) => {
  return fetch("http://localhost:5000/business/" + `${businessId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getBusiness = (businessId) => {
  console.log(businessId);
  return fetch("http://localhost:5000/business/" + `${businessId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const customerSignout = (next) => {
  if (typeof window !== "undefined") localStorage.removeItem("customerJWT");
  next();
  return fetch("http://localhost:5000/api/customer/signout", {
    method: "GET",
  })
    .then((response) => {
      console.log("Customer signout success", response);
      return response.json;
    })
    .catch((err) => console.log(err));
};

export const businessSignout = (next) => {
  if (typeof window !== "undefined") localStorage.removeItem("businessJWT");
  next();
  return fetch("http://localhost:5000/api/business/signout", {
    method: "GET",
  })
    .then((response) => {
      console.log("Business signout success", response);
      return response.json;
    })
    .catch((err) => console.log(err));
};
