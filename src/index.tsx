import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import Sprite from './Sprite';
import Stage from './Stage';
import Vec from './Vec';

class Ball extends Sprite {
  
  private r: number; 

  constructor(x: number, y: number, r: number){
    super(Vec.n(x,y), 0);
    this.r = r;
  }

  render(): JSX.Element {
    return <circle r={this.r} />
  }
}


class House extends Sprite {

  constructor(x: number, y: number){
    super(Vec.n(x,y), 0);
  }

  render(): JSX.Element {
    return (
      <path d="M 0 0 L 200 0 L 200 200 L 100 300 L 0 200 z"
      fill="red" stroke="blue" stroke-width="3" />
    )
  }
}

let stage = new Stage(800, 600);
stage.sprites = [
  new Ball(20, 30, 10),
  new House(0, 0)
]

ReactDOM.render(
  <React.StrictMode>
    {stage.render()}
  </React.StrictMode>,
  document.getElementById('root')
);
