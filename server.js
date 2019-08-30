const express = require("express");
const process = require("process");
const axios = require("axios");
const path = require("path");
const opn = require("opn");
const ip = require("ip");

require("dotenv").config();

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.post("/predict", (req, res) => {
  console.log(req.body);
  axios
    .post(
      `https://developers.datarobot.com/predApi/v1.0/deployments/${process.env.DEPLOYMENT_ID}/predictions/`,
      [{ line: req.body.line }],
      {
        headers: {
          Authorization: "bearer " + process.env.API_TOKEN
        }
      }
    )
    .then(response => res.send(response.data.data[0]))
    .catch(err => console.log(err));
});

const port = process.env.PORT || 3894;
const CYAN = "\x1b[36m%s\x1b[0m";
app.listen(port, () => {
  console.log(
    CYAN,
    `App is running locally on http://localhost:${port}\nand on your network at http://${ip.address()}:${port}`
  );
  opn(`http://localhost:${port}`);
});
