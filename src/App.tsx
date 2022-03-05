import { observer } from "mobx-react-lite"
import { makeAutoObservable } from "mobx"
import Timer from './Timer';

const timer = new Timer();
setInterval(() => {
  timer.increaseTimer()
}, 1000);

const myTimer = makeAutoObservable(timer);
const ObserverTimerView = observer(() => {
  return myTimer.render();
});


export default function App(){
  return (
    <ObserverTimerView />
  )
}