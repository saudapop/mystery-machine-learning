rm -rf constants.js;
echo "Making the AI!";
node make-ai.js $1;
echo "Installing server dependencies";
npm i;
cd client;
echo "Installing client dependencies"
npm i;
npm run build;
cd ../
npm start;
