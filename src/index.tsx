import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import Sprite from './Sprite';
import Stage from './Stage';
import Vec from './Vec';

class Ball extends Sprite {
  
  private r: number; 
  private x: number;
  private y: number;

  constructor(x: number, y: number, r: number){
    super();
    this.r = r;
    this.x = x;
    this.y = y;
  }

  render(): JSX.Element {
    let transform = `translate(${this.x}, ${this.y})`
    return <circle r={this.r} transform={transform} />
  }
}


class House extends Sprite {

  private x: number;
  private y: number;

  constructor(x: number, y: number){
    super();
    this.x =x;
    this.y = y;
  }

  render(): JSX.Element {
    let transform = `translate(${this.x}, ${this.y}) rotate(5, 100, 0)`;

    return (
      <path d="M 0 0 L 200 0 L 200 200 L 100 300 L 0 200 z"
            fill="red" 
            stroke="blue" 
            stroke-width="3" 
            transform={transform}
            />
    )
  }
}

let stage = new Stage(1000, 600, -300, -100, 1.5);
stage.sprites = [
  new House(50, 100),
  new Ball(0, 0, 5),
  new Ball(0, 100, 5),
  new Ball(100, 0, 5),
  new Ball(100, 100, 5),
  new Ball(200, 0, 5),
  new Ball(200, 100, 5)
]

ReactDOM.render(
  <React.StrictMode>
    {stage.render()}
  </React.StrictMode>,
  document.getElementById('root')
);
