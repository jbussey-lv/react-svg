export default class Marble {

  public position: number;
  public millis: number = 0;

  constructor(position: number){
    this.position = position;
    setInterval(this.increasePosition, 20);
  }

  private increasePosition = () => {
    this.position += 0.4;
  }

  render(){
    return (
      <circle cx={this.position} cy={this.position} r="25" />
    )
  }

}