# Mystery Machine Learning!

_powered by [DataRobot AI API](https://developers.datarobot.com)_

To see the [app in action click here](http://157.245.8.180:3894/) or read below to run the app locally.

This app was adapted (_...appdapted?_) from an app that [Peter Hurford](https://github.com/peterhurford) and I collaborated on (aka I built the front-end) for his presentation at [THAT Conference 2019](https://github.com/peterhurford/mystery_machine_learning/blob/master/slides.pdf). The only difference between the apps is this one is using the DataRobot AI API to power the prediction engine.

## Run the app locally

1. **Clone the repo** 

#### `git clone https://github.com/saudapop/mystery-machine-learning.git`

2. **Install the app**

Assuming you have node and npm installed, just run this little script and **plug in your API token inside the quotes**

#### `./install.sh "PUT_YOUR_TOKEN_HERE"`

It will open the app in your default browser. It looks best in chrome but that's just one humble dev's opinion.

## Run the app in development mode

To run the app in dev mode, the front-end and back-end both need to be running in separate terminals.

1. **Start the front-end**

If you want to mess around with the front-end, run this command in a new terminal from the root:

#### `cd client; npm start`

This will run the react app in dev mode and it will hot reload any time you make a change to the front end.

2. **Start the back-end(if its not already running)**

The back-end also needs to be running to make API calls. In a separate terminal,**from the project root** run

#### `npm start`
