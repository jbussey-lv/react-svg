import { timerProps } from "./Timer";

export default function TimerView(props: timerProps){
  let { timer } = props;
  return (
    <span>Seconds passed: {timer.secondsPassed}</span>
  );
}