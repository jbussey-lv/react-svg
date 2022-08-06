import Sprite from "./Sprite";
import Vec from "./Vec";

export default class Stage {

  private pixelWidth: number;
  private pixelHeight: number;
  public pixelsPerMeter: number = 4;
  public origin: Vec = Vec.n(0, 0); // where bottom left of stage shows in real meter coords
  public sprites: Sprite[] = [];

  constructor(pixelWidth: number, pixelHeight: number) {
    this.pixelWidth = pixelWidth;
    this.pixelHeight = pixelHeight;
  }

  private transformSpriteRender(sprite: Sprite): JSX.Element {
    // have to scale, rotate, and transform
    let transform = `translate(${sprite.pos.x} ${sprite.pos.y})`
    return (
      <g transform={transform}>
        {sprite.render()}
      </g>
    )
  }

  render(): JSX.Element {
    return (
      <svg id="stage" width={this.pixelWidth} height={this.pixelHeight} style={{border: "1px solid black"}}>
        {this.sprites.map(sprite => this.transformSpriteRender(sprite))}
      </svg>
    )
  }



}