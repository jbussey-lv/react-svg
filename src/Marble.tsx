export default class Marble {

  public size: number;
  public millis: number = 0;
  public key: number = Math.floor(Math.random() * 10000);

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
      <div key={this.key}>Marble - size = {this.size}, {this.millis}</div>
    )
  }

}