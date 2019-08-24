import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import axios from "axios";
import logo from "./misc-images/mystery_machine.png";
import githubLogo from "./misc-images/github-logo.png";
import Shaggy from "./scooby-doo-characters/Shaggy_Rogers.png";
import Fred from "./scooby-doo-characters/Fred_Jones.png";
import Daphne from "./scooby-doo-characters/Daphne_Blake.png";
import Velma from "./scooby-doo-characters/Velma_Dinkley.png";
import Scooby from "./scooby-doo-characters/Scooby_Doo.png";
import "./App.css";

const images = {
  "Shaggy Rogers": Shaggy,
  "Velma Dinkley": Velma,
  "Fred Jones": Fred,
  "Daphne Blake": Daphne,
  "Scooby-Doo": Scooby
};

const GITHUB_URL = "https://github.com/saudapop/mystery-machine-learning";

function App() {
  const [data, setData] = useState();
  const [textToPredict, setTextToPredict] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  /**
   * This function makes our api calls. We could attach it to a
   * button but it's way cooler to make them happen in real time
   * using `useEffect` below.
   */
  function predictWhoSaidIt() {
    axios
      .post("/predict", {
        line: textToPredict
      })
      .then(res => {
        setData(res.data);
        console.log(res.data);
      });
  }

  /**
   * `debounce` let's us only make the api calls after
   * the user is done typing(300 ms). Otherwise it would execute with
   * every keystroke.
   */
  const setTextDebounced = debounce(setTextToPredict, 300);

  /**
   * This effect says: "whenever the `textToPredict` changes(and if
   * it exists), run our function `predictWhoSaidIt()`"
   */
  useEffect(() => {
    if (textToPredict) {
      predictWhoSaidIt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textToPredict]);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setIsMobile(window.innerWidth < 800)
    );
  }, []);

  return (
    <div className="App">
      <header className={`The-View ${isMobile ? "mobile" : ""}`}>
        <div className="top-content">
          <div>
            <a href={GITHUB_URL}>
              <img className="github-logo" src={githubLogo} alt="github" />
            </a>
          </div>
          <div className="header">
            <span>Mystery Machine Learning!</span>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div>Who said :</div>
          <div className="text-preview">
            "{!textToPredict ? "___________" : textToPredict}" ?
          </div>
          <textarea
            className="text-area"
            onChange={e => setTextDebounced(e.target.value)}
          />
        </div>
        {data && (
          <div className="content">
            <PredictionsContainer data={data} />
          </div>
        )}
      </header>
    </div>
  );
}

function PredictionsContainer({ data }) {
  return (
    <div className="results">
      {data && data.prediction && (
        <div className="winner">
          It was probably...
          <div className="image-container">
            <img
              className="winner-image"
              src={images[data.prediction]}
              alt={"winner"}
            />
          </div>
          {data.prediction}!
        </div>
      )}

      <div className="data-table">
        <table>
          <tbody>
            {data &&
              data.predictionValues
                .map(person => {
                  return {
                    name: person.label,
                    score: (person.value * 100).toFixed(2)
                  };
                })
                .sort((a, b) => b.score - a.score)
                .map((person, i) => (
                  <tr key={`${person.name}-${i}`}>
                    <td className="person-name">{person.name}</td>
                    <td className="person-score">{person.score} %</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
