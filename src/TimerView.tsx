import Timer from "./Timer";

export interface timerProps {
  timer: Timer
};

export default function TimerView(props: timerProps){
  let { timer } = props;
  return (
    <span>Seconds passed: {timer.secondsPassed}</span>
  );
}