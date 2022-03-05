export default class Timer {
  secondsPassed: number = 0;

  constructor(){
    setInterval(() => {
      this.increaseTimer()
    }, 1000);
  }

  increaseTimer() {
      this.secondsPassed += 1
  }

  render(){
    return (
      <span>Seconds passed: {this.secondsPassed}</span>
    );
  }
}