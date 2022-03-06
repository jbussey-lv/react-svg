import ReactiveRender from "./ReactiveRender";
import Marble from "./Marble";

export default class App {

  secondsPassed: number = 0;
  marbles: Marble[] = [];
  go: boolean = true;

  constructor(){
    setInterval(() => {
      if(this.go){
        this.increaseTimer();
      }
    }, 1000);
    this.toggle.bind(this);
    this.marbles.push(new Marble(3));
    this.marbles.push(new Marble(5));
    this.marbles.push(new Marble(7));
    this.marbles.push(new Marble(1));
  }

  toggle(){
    this.go = !this.go;
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
        <span onClick={() => {this.toggle()}}>Seconds passed: {this.secondsPassed} [click me]</span>
        {this.marbles.map(marble => ReactiveRender(marble)) }
      </div>
    );
  }
}