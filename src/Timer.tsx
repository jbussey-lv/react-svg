
export interface timerProps {
  timer: Timer
};

export default class Timer {
  secondsPassed: number = 0

  increaseTimer() {
      this.secondsPassed += 1
  }
}