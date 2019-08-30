CYAN='\033[1;36m'

function printLine(){
  printf "${CYAN}%`tput cols`s"|tr ' ' '~'
}

printLine;
printf "\n\n${CYAN}Making the AI!\n\n";
printLine;
node make-ai.js $1;
printLine;
printf "\n\n${CYAN}Installing server dependencies\n\n";
printLine;
npm i;
cd client;
printLine;
printf "\n\n${CYAN}Installing client dependencies\n\n"
printLine;
npm i;
npm run build;
cd ../;
npm start;
