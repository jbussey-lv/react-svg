import Vec from "./Vec";

abstract class Sprite {

  abstract render(): JSX.Element;

  abstract update(dt: number): void
}

export default Sprite;