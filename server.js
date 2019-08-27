const express = require("express");
const axios = require("axios");
const path = require("path");
const opn = require("opn");
const ip = require("ip");

const { API_TOKEN, DEPLOYMENT_ID } = require("./constants");

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
      `https://developers.datarobot.com/predApi/v1.0/deployments/${DEPLOYMENT_ID}/predictions/`,
      [{ line: req.body.line }],
      {
        headers: {
          Authorization: "bearer " + API_TOKEN
        }
      }
    )
    .then(response => res.send(response.data.data[0]))
    .catch(err => console.log(err));
});

const port = process.env.PORT || 3894;

app.listen(port, () => {
  console.log(
    `App is running locally on http://localhost:${port}\nand on your network at http://${ip.address()}:${port}`
  );
  opn(`http://localhost:${port}`);
});
