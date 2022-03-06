export default class Marble {

  public size: number;
  public millis: number = 0;

  constructor(size: number){
    this.size = size;
    setInterval(()=>{
      this.millis += 1;
    }, 100);
  }

  addToSize(diff: number){
    this.size += diff;
  }

  render(){
    return (
      <div>Marble - size = {this.size}, {this.millis}</div>
    )
  }

}