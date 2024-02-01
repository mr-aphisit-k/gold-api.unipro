const express = require("express");
const router = express.Router();

const rateLimit = require("express-rate-limit");

const controllerAuthentication = require("../controllers/authentication");
/* A rate limit middleware. */
const limit = rateLimit({
  windowMs: 1000,
  max: 2,
  message: "Too many requests, please try again after an 1 minute",
});
router.post("/v1/auth/login", limit, controllerAuthentication.login);
module.exports = router;
