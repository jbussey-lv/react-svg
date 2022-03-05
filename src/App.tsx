import { observer } from "mobx-react-lite"
import { makeAutoObservable } from "mobx"
import Timer from './Timer';
import TimerView from "./TimerView";

const ObserverTimerView = observer(TimerView);
const myTimer = makeAutoObservable(new Timer());

export default function App(){
  return <ObserverTimerView timer={myTimer} />
}