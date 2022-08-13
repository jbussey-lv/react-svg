// import { render } from '@testing-library/react';
// import React from 'react';
// import ReactDOM from 'react-dom';

import Matter from 'matter-js';

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
var ship = Bodies.rectangle(400, 200, 160, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

let thrustNet = -0.03;
var leftThruster = Bodies.circle(100, 0, 5);
var rightThruster = Bodies.circle(100, 0, 5);
leftThruster.collisionFilter = {
  'group': -1,
  'category': 2,
  'mask': 0,
};
rightThruster.collisionFilter = {
  'group': -1,
  'category': 2,
  'mask': 0,
};

// add all of the bodies to the world
Composite.add(engine.world, [leftThruster, rightThruster, ship, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

const keysDown = new Set();
document.addEventListener("keydown", event => {
  keysDown.add(event.code);
});
document.addEventListener("keyup", event => {
  keysDown.delete(event.code);
});

console.log(engine.gravity, leftThruster.mass)

Matter.Events.on(engine, "beforeUpdate", event => {

  let leftThrusterPos = {
    x: -40 * Math.cos(ship.angle) + ship.position.x,
    y: -40 * Math.sin(ship.angle) + ship.position.y
  }

  let thrustForce = {
    x: -1 * thrustNet * Math.sin(ship.angle), 
    y: thrustNet * Math.cos(ship.angle)
  }

  let rightThrusterPos = {
    x: 40 * Math.cos(ship.angle) + ship.position.x,
    y: 40 * Math.sin(ship.angle) + ship.position.y
  }

  Body.applyForce(leftThruster, leftThruster.position, {x: 0, y: -1 * engine.gravity.scale * leftThruster.mass});
  Body.applyForce(rightThruster, rightThruster.position, {x: 0, y: -1 * engine.gravity.scale * rightThruster.mass});

  // Matter.Body.setPosition(leftThruster, {x: 100, y: 100})
  if(keysDown.has('KeyA')){
    Body.applyForce( ship, leftThrusterPos, thrustForce);
  }
  if(keysDown.has('KeyD')){
    Body.applyForce( ship, rightThrusterPos, thrustForce);
  }

  Body.setPosition(leftThruster, {...leftThrusterPos})
  Body.setPosition(rightThruster, {...rightThrusterPos})
  
});
