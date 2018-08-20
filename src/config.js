const config = {
  pointsPerQuestion: 5,
  auth0: {
    clientId: "Ml52S0dL3GHJUuL4Q8Vl7aeL540pELiM",
    clientDomain: "fikitout.auth0.com",
    audience: "http://localhost:1337/",
    redirect: "http://localhost:3000/callback",
    scope: "openid profile email"
  }
};

export default config;
