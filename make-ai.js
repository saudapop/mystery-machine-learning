const process = require("process");
const fs = require("fs");

const DataRobotAIClient = require("datarobot-ai");

// instantiate the client
const dr = new DataRobotAIClient({ key: process.argv[2] });

async function makeAi() {
  // you can now create an AI
  const ai = await dr.createAi("scooby_AI");

  // model the 'character' column from the file 'scooby_doo_lines.csv'
  const scooby_AI = await ai.learn(
    "character",
    "./transcripts/scooby_doo_lines.csv"
  );
  //  get the output and write the credentials to constants.js
  const output = await scooby_AI.getOutput("character");
  fs.writeFile(
    "./constants.js",
    `
const API_TOKEN = "${process.argv[2]}";
const DEPLOYMENT_ID = "${output.source.deploymentId}"; 
module.exports = {API_TOKEN, DEPLOYMENT_ID};
`,
    () => console.log("AI was successfully created!")
  );
}

makeAi();
