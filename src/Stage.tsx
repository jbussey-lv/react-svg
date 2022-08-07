import Sprite from "./Sprite";
import Vec from "./Vec";

export default class Stage {

  private pixelWidth: number;
  private pixelHeight: number;
  private originX: number;
  private originY: number;
  public pixelsPerMeter: number;
  public sprites: Sprite[] = [];

  constructor(pixelWidth: number, pixelHeight: number, originX: number, originY: number, pixelsPerMeter: number) {
    this.pixelWidth = pixelWidth;
    this.pixelHeight = pixelHeight;
    this.originX = originX;
    this.originY = originY;
    this.pixelsPerMeter = pixelsPerMeter;
  }

  render(): JSX.Element {

    let viewHeight = this.pixelHeight/this.pixelsPerMeter;

    let viewBox = `${this.originX} ${this.originY} ${this.pixelWidth/this.pixelsPerMeter} ${this.pixelHeight/this.pixelsPerMeter}`;
    let transform = `translate(0, ${viewHeight + 2 * this.originY}) scale(1,-1)`;
    return (
      <svg viewBox={viewBox} width={this.pixelWidth} height={this.pixelHeight} style={{border: "1px solid black"}}>
        <g transform={transform}>
          {this.sprites.map(sprite => sprite.render())}
        </g>
      </svg>
    )
  }



}