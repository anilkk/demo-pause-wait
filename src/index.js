import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import random from "random";
import reducer, { initialState } from "./reducer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./styles.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const styles = {
    animation: {
      animation: state.isPauseDemoRunning
        ? "orangebox 3s ease forwards"
        : "reset 100000000s"
    }
  };
  function pauseComplete(pasueDuration) {
    // alert(` pause complete after ${pasueDuration / 1000} seconds`);
    dispatch({
      type: "updatePauseDemoRunning",
      isPauseDemoRunning: false
    });
  }

  return (
    <div className="App">
      <h1>Demo of Pause</h1>
      <p>
        <strong>Pause duration</strong>: {state.pasueDuration / 1000} seconds
        {"  "}
        <Button onClick={() => dispatch({ type: "decrementPause" })}>-</Button>
        {"  "}
        <Button onClick={() => dispatch({ type: "incrementPause" })}>+</Button>
      </p>
      <p>
        <strong>Demo duration</strong>: {state.demoDuration / 1000} seconds
        {"  "}
        <Button
          disabled={state.demoDuration === 1000}
          onClick={() => dispatch({ type: "decrementDemoDuration" })}
        >
          -
        </Button>
        {"  "}
        <Button
          disabled={state.pasueDuration === state.demoDuration + 1000}
          onClick={() => dispatch({ type: "incrementDemoDuration" })}
        >
          +
        </Button>
        <Button
          onClick={() =>
            dispatch({
              type: "updateDemoDuration",
              demoDuration:
                random.int(1, (state.pasueDuration - 1000) / 1000) * 1000
            })
          }
        >
          Random
        </Button>
      </p>
      <p>Is pause demo running? {state.isPauseDemoRunning ? "yes" : "no"} </p>
      <p>demo duration {state.demoDuration / 1000} </p>
      <p>
        <Button
          disabled={state.isPauseDemoRunning}
          onClick={() => {
            dispatch({
              type: "updatePauseDemoRunning",
              isPauseDemoRunning: true
            });
            setTimeout(() => {
              pauseComplete(state.pasueDuration);
            }, state.pasueDuration);
          }}
        >
          Start
        </Button>
      </p>
      <div id="demoBox" className="box orange" style={styles.animation} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
