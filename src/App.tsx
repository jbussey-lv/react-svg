import ReactiveRender from "./ReactiveRender";
import Marble from "./Marble";

export default class App {

  width: number = 150;
  height: number = 75;
  marbles: Marble[] = [];
  go: boolean = true;

  constructor(){
    setInterval(() => {
      if(this.go){
        this.increaseSize();
      }
    }, 1000);
    this.marbles.push(new Marble(25));
    this.marbles.push(new Marble(100));
  }

  increaseSize() {
    this.width += 50;
    this.height += 40;
  }

  get style(){
    return {
      fill: "rgb(0,0,255)",
      strokeWidth:3,
      stroke: "rgb(0,0,0)"
    }
  }

  render(){
    return (
      <svg width="800" height="600">

        <g fill="white" stroke="green" strokeWidth="5">
          <rect width={this.width} height={this.height} style={this.style} />
          {this.marbles.map(marble => ReactiveRender(marble))}
        </g>

      </svg>
    );
  }
}