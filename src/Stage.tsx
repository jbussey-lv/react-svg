import Sprite from "./Sprite";
import Vec from "./Vec";

export default class Stage {

  private pixelWidth: number;
  private pixelHeight: number;
  private originX: number;
  private originY: number;
  public scale: number;
  public pixelsPerMeter: number = 4;
  public sprites: Sprite[] = [];

  constructor(pixelWidth: number, pixelHeight: number, originX: number, originY: number, scale: number) {
    this.pixelWidth = pixelWidth;
    this.pixelHeight = pixelHeight;
    this.originX = originX;
    this.originY = originY;
    this.scale = scale;
  }

  render(): JSX.Element {

    let viewHeight = this.pixelHeight/this.scale;

    let viewBox = `${this.originX} ${this.originY} ${this.pixelWidth/this.scale} ${this.pixelHeight/this.scale}`;
    let transform = `translate(0, ${viewHeight + 2* this.originY}) scale(1,-1)`;
    return (
      <svg viewBox={viewBox} width={this.pixelWidth} height={this.pixelHeight} style={{border: "1px solid black"}}>
        <g transform={transform}>
          {this.sprites.map(sprite => sprite.render())}
        </g>
      </svg>
    )
  }



}