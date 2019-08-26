rm -rf constants.js;
echo "const API_TOKEN = \"$1\"; module.exports = API_TOKEN;" | cat > constants.js;
npm i;
cd client;
npm i;
npm run build;
cd ../
npm start;
