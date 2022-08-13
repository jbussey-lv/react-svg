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
var ground = Bodies.rectangle(-1000, 610, 5000, 60, { isStatic: true });

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

var gamepadOutput = document.getElementById("gamepad-output")

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

var thrustMax = 0.02;

function getLeftThrustNet(): number{
  let gamepad = navigator.getGamepads()[0];
  if(!gamepad){return 0};
  return gamepad.axes[1] * thrustMax;
}

function getRightThrustNet(): number{
  let gamepad = navigator.getGamepads()[0];
  if(!gamepad){return 0};
  return gamepad.axes[3] * thrustMax;;
}

function getLeftThrusterPos(ship: Matter.Body){
  return {
    x: -40 * Math.cos(ship.angle) + ship.position.x,
    y: -40 * Math.sin(ship.angle) + ship.position.y
  }
}

function getRightThrusterPos(ship: Matter.Body){
  return {
    x: 40 * Math.cos(ship.angle) + ship.position.x,
    y: 40 * Math.sin(ship.angle) + ship.position.y
  }
}

Matter.Events.on(engine, "beforeUpdate", event => {

  let leftThrusterPos = getLeftThrusterPos(ship);

  let rightThrusterPos = getRightThrusterPos(ship);

  let leftThrustForce = {
    x: -1 * getLeftThrustNet() * Math.sin(ship.angle), 
    y: getLeftThrustNet() * Math.cos(ship.angle)
  }

  let rightThrustForce = {
    x: -1 * getRightThrustNet() * Math.sin(ship.angle), 
    y: getRightThrustNet() * Math.cos(ship.angle)
  }

  Body.applyForce(leftThruster, leftThruster.position, {x: 0, y: -1 * engine.gravity.scale * leftThruster.mass});
  Body.applyForce(rightThruster, rightThruster.position, {x: 0, y: -1 * engine.gravity.scale * rightThruster.mass});

  // Matter.Body.setPosition(leftThruster, {x: 100, y: 100})
  Body.applyForce( ship, leftThrusterPos, leftThrustForce);
  Body.applyForce( ship, rightThrusterPos, rightThrustForce);
  
});


Matter.Events.on(engine, "afterUpdate", event => {

  let leftThrusterPos = getLeftThrusterPos(ship);

  let rightThrusterPos = getRightThrusterPos(ship);

  Body.setPosition(leftThruster, {...leftThrusterPos})
  Body.setPosition(rightThruster, {...rightThrusterPos})
})
