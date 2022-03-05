import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
import Timer, { timerProps } from './Timer';


const myTimer = makeAutoObservable(new Timer());


// A function component wrapped with `observer` will react
// to any future change in an observable it used before.
let tv = (props: timerProps) => {
  let { timer } = props;
  return (
    <span>Seconds passed: {timer.secondsPassed}</span>
  );
}


setInterval(() => {
    myTimer.increaseTimer()
}, 1000);


const TimerView = observer(tv)

function App() {
  return (
    <div className="App">
      <TimerView timer={myTimer} />
    </div>
  );
}

export default App;