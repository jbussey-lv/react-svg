import Vec from "./Vec";

abstract class Sprite {

    public pos: Vec; // meters
    public ang: number; // radians
  
    constructor(pos: Vec, ang: number) {
      this.pos = pos;
      this.ang = ang;
    }

  abstract render(): JSX.Element;
}

export default Sprite;