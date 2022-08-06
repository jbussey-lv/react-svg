
import { mockComponent } from "react-dom/test-utils";
import { ForceArm } from "./ForceArm";
import { MassArm } from "./MassArm";
import Vec from "./Vec";

abstract class Body {

  public pos: Vec; // meters
  public vel: Vec; // meters / sec
  public ang: number; // radians
  public angVel: number; // radians / sec
  public size: Vec; // meters

  constructor(pos: Vec, vel: Vec, ang: number, angVel: number, size: Vec) {
    this.pos = pos;
    this.vel = vel;
    this.ang = ang;
    this.angVel = angVel;
    this.size = size;
  }

  abstract getForceArms(): ForceArm[];

  abstract getMassArms(): MassArm[];

  abstract render(): JSX.Element;

  public getMass(): number {
    return this.getMassArms()
               .reduce((memo, massArm) => memo + massArm.mass, 0);
  }

  public getNetForce(): Vec {
    return this.getForceArms()
               .reduce((memo: Vec, forceArm: ForceArm) => memo.plus(forceArm.force), Vec.n())
  }

  public getCog(): Vec {

    return this.getMassArms()
                .reduce(
                  (memo: Vec, massArm: MassArm) => memo.plus(massArm.arm.times(massArm.mass)),
                  Vec.n()
                )
                .divide(this.getMass());
  }

  public getMoment(): number {

    let cog = this.getCog();

    return this.getMassArms()
                .reduce(
                  (memo: number, massArm: MassArm) => {
                    let dist = massArm.arm.minus(cog).magnitude;
                    return memo + massArm.mass * dist * dist},
                  0);
  }

  public getNetTorque(): number {
    return this.getForceArms().reduce(
      (memo, forceArm) => memo + this.getTorque(forceArm),
      0
    );
  }

  private getTorque(forceArm: ForceArm): number {
    return forceArm.force.magnitude * 
           forceArm.arm.magnitude *
           Math.sin(forceArm.force.angle - forceArm.arm.angle);
  }
}

export default Body;