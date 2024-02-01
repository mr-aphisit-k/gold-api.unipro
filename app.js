const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const helmet = require("helmet");

// Routes
const apiRoutes = require("./src/routes/api");

app.use(
  bodyParser.urlencoded({
    parameterLimit: 100,
    extended: false,
    limit: "1024mb",
  })
);
/* A middleware that parses the body of the request. */
app.use(bodyParser.json({ limit: "1024mb" }));
/* A middleware that allows cross-origin requests. */
app.use(require("cors")({ origin: "*" }));
/* A middleware that helps secure Express apps by setting various HTTP headers. */
app.use(helmet());
app.use("/api", apiRoutes);
app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
