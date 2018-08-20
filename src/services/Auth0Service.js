import * as auth0 from "auth0-js";
import config from "../config";

const _auth0 = new auth0.WebAuth({
  clientID: config.auth0.clientId,
  domain: config.auth0.clientDomain,
  responseType: "token",
  redirectUri: config.auth0.redirect,
  audience: config.auth0.audience,
  scope: config.auth0.scope
});

export default _auth0;
