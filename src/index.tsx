import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"

class Timer {
    secondsPassed: number = 0

    increaseTimer() {
        this.secondsPassed += 1
    }
}

const myTimer = makeAutoObservable(new Timer());

interface timerProps {
  timer: Timer
};

// A function component wrapped with `observer` will react
// to any future change in an observable it used before.
let tv = (props: timerProps) => {
  let { timer } = props;
  return (
    <span>Seconds passed: {timer.secondsPassed}</span>
  );
}

const TimerView = observer(tv)

ReactDOM.render(<TimerView timer={myTimer} />, document.body)

setInterval(() => {
    myTimer.increaseTimer()
}, 1000)