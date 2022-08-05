abstract class Sprite {

  abstract step(dt: number): void;

  abstract render(): JSX.Element;
}

export default Sprite;