import Matter from 'matter-js';

// module aliases
var {Engine, Render, Runner, Bodies, Body, Composite, Constraint} = Matter;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {wireframes: true, showAngleIndicator: true}
});

var scale = 0.9;
var xx = 150, yy=100, width=150*scale, height=30*scale, wheelSize=30*scale;
var friction = 0.5;
var wheelDensity = 0.0001;
var thrustMax = 1;

var group = Body.nextGroup(true),
        wheelBase = 20,
        wheelAOffset = -width * 0.5 + wheelBase,
        wheelBOffset = width * 0.5 - wheelBase,
        wheelYOffset = 0;

var car = Composite.create({ label: 'Car' });

var body = Bodies.rectangle(xx, yy, width, height, { 
    collisionFilter: {
        group: group
    },
    chamfer: {
        radius: height * 0.5
    },
    density: 0.0002
});

var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, { 
    collisionFilter: {
        group: group
    },
    friction,
    density: wheelDensity
});
            
var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, { 
    collisionFilter: {
        group: group
    },
    friction,
    density: wheelDensity
});
            
var axelA = Constraint.create({
    bodyB: body,
    pointB: { x: wheelAOffset, y: wheelYOffset },
    bodyA: wheelA,
    stiffness: 1,
    length: 0
});
                
var axelB = Constraint.create({
    bodyB: body,
    pointB: { x: wheelBOffset, y: wheelYOffset },
    bodyA: wheelB,
    stiffness: 1,
    length: 0
});

Composite.add(car, body);
Composite.add(car, wheelA);
Composite.add(car, wheelB);
Composite.add(car, axelA);
Composite.add(car, axelB);

var wallOptions = {friction, isStatic: true};
var ground = Bodies.rectangle(-1000, 610, 5000, 60, wallOptions);
var leftWall = Bodies.rectangle(-10, 0, 60, 5000, wallOptions);
var rightWall = Bodies.rectangle(810, 0, 60, 5000, wallOptions);
var roof = Bodies.rectangle(-1000, -10, 5000, 60, wallOptions);


let bodies = [car, ground, leftWall, rightWall, roof];

// add all of the bodies to the world
Composite.add(engine.world, bodies);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

const keysDown = new Set();
document.addEventListener("keydown", event => {
  keysDown.add(event.code);
});
document.addEventListener("keyup", event => {
  keysDown.delete(event.code);
});

// run the engine
Runner.run(runner, engine);

function applyTorque(constraint: Matter.Constraint, torque: number){

  let torqueForceOffset = 0.06;
  let bodyA = constraint.bodyA;
  let posA = bodyA.position;
  let bodyB = constraint.bodyB;
  let posB = bodyB.position;

  Body.applyForce(bodyA, {x: posA.x-torqueForceOffset, y: posA.y}, {x: 0, y: -torque});
  Body.applyForce(bodyA, {x: posA.x+torqueForceOffset, y: posA.y}, {x: 0, y: torque});
  Body.applyForce(bodyB, {x: posB.x-torqueForceOffset, y: posB.y}, {x: 0, y: torque});
  Body.applyForce(bodyB, {x: posB.x+torqueForceOffset, y: posB.y}, {x: 0, y: -torque});

}

function getThrust(): number{
  let gamepad = navigator.getGamepads()[0];

  let thrust = gamepad ?
               gamepad.axes[0] * thrustMax :
               0;

  return thrust;
}

Matter.Events.on(engine, "beforeUpdate", event => {

    applyTorque(axelA, getThrust());
    applyTorque(axelB, getThrust());

    // applyTorque(axelA, (wheelA.angularSpeed - body.angularSpeed) * -0.3);
    // applyTorque(axelB, (wheelB.angularSpeed - body.angularSpeed) * -0.3);

});