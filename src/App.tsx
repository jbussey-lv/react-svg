import ReactiveRender from "./ReactiveRender";
import Marble from "./Marble";

export default class App {

  secondsPassed: number = 0;
  marbles: Marble[] = [];

  constructor(){
    setInterval(() => {
      this.increaseTimer()
    }, 1000);
    this.marbles.push(new Marble(3));
    this.marbles.push(new Marble(5));
    this.marbles.push(new Marble(7));
    this.marbles.push(new Marble(1));
  }

  increaseTimer() {
      this.secondsPassed += 1
      this.marbles.forEach(marble => {
        marble.addToSize(1);
      });
  }

  render(){
    return (
      <div>
        <span>Seconds passed: {this.secondsPassed}</span>
        {this.marbles.map(marble => ReactiveRender(marble)) }
      </div>
    );
  }
}