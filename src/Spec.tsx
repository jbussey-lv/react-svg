import Sprite from "./Sprite";

export default class Spec {

  public position: number;
  public millis: number = 0;

  constructor(position: number){
    this.position = position;
  }

  step(dt: number) {
    this.position += 30 * dt;
  }

  render(){
    return (
      <circle cx={this.position} cy={this.position} r="2" />
    )
  }

}