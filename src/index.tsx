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

let stage = new Stage(800, 600);
stage.sprites = [
  new Ball(20, 30, 10),
  new Ball(50, 100, 30),
  new Ball(100, 50, 20),
]

ReactDOM.render(
  <React.StrictMode>
    {stage.render()}
  </React.StrictMode>,
  document.getElementById('root')
);
