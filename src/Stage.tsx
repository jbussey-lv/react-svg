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

  private getTranslation(sprite: Sprite): string {
    let pixelX = sprite.pos.x;
    let pixelY = sprite.pos.y;
    return `${pixelX} ${pixelY}`;
  }

  private transformSpriteRender(sprite: Sprite): JSX.Element {
    // have to scale, rotate, and transform
    let transform = `translate(${this.getTranslation(sprite)})`
    return (
      <g transform={transform}>
        {sprite.render()}
      </g>
    )
  }

  render(): JSX.Element {

    let viewBox = `0 0 {this.pixelWidth} height={this.pixelHeight}`;
    return (
      <svg id="stage" viewBox={viewBox} width={this.pixelWidth} height={this.pixelHeight} style={{border: "1px solid black"}}>
        {/* <g transform="scale(1,-1)"> */}
          {this.sprites.map(sprite => this.transformSpriteRender(sprite))}
        {/* </g> */}
      </svg>
    )
  }



}