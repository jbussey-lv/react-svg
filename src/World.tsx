import React from "react";
import Marble from "./Marble";
import Sprite from "./Sprite";

export default class World extends React.Component {

  dt: number = 0.03;

  width: number = 800;
  height: number = 600;
  sprites: Sprite[] = [];
  go: boolean = true;

  constructor(){
    super({});
    setInterval(() => {

      if(this.go){
        this.sprites.forEach(sprite => sprite.step(this.dt));

        this.forceUpdate();
      }
    }, this.dt*1000);
    this.sprites.push(new Marble(25));
    this.sprites.push(new Marble(100));
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
          {this.sprites.map(sprite => sprite.render())}
        </g>

      </svg>
    );
  }
}