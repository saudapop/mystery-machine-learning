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
  //  get the output and write the credentials to .env
  const output = await scooby_AI.getOutput("character");
  fs.writeFile(
    "./.env",
    `
  API_TOKEN=${process.argv[2]}
  DEPLOYMENT_ID=${output.source.deploymentId}
  `,
    () => console.log("\n\nAI was successfully created!\n")
  );
}

makeAi();
