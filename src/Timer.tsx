export default class Timer {
  secondsPassed: number = 0;

  increaseTimer() {
      this.secondsPassed += 1
  }

  render(){
    return (
      <span>Seconds passed: {this.secondsPassed}</span>
    );
  }
}