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
    let transform = `translate(${this.x}, ${this.y}) rotate(5, 1, 0)`;

    return (
      <path d="M 0 0 L 2 0 L 2 2 L 1 3 L 0 2 z"
            fill="red" 
            stroke="blue" 
            stroke-width="2"
            vector-effect="non-scaling-stroke"
            transform={transform}/>
    )
  }
}

let stage = new Stage(1000, 600, -2, -1, 30);
stage.sprites = [
  new House(1, 1),
  new Ball(0, 0, 0.1),
  new Ball(0, 1, 0.1),
  new Ball(1, 0, 0.1),
  new Ball(1, 1, 0.1),
  new Ball(2, 0, 0.1),
  new Ball(2, 1, 0.1)
]

ReactDOM.render(
  <React.StrictMode>
    {stage.render()}
  </React.StrictMode>,
  document.getElementById('root')
);
