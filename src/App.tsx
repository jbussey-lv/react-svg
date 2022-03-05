import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
import Timer, { timerProps } from './Timer';
import TimerView from "./TimerView";


const ObserverTimerView = observer(TimerView);
const myTimer = makeAutoObservable(new Timer());


function App() {
  return (
    <div className="App">
      <ObserverTimerView timer={myTimer} />
    </div>
  );
}

export default App;