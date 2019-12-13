import PlayerParams from '../dtos/playerParams';

export default class Player {
  private context: CanvasRenderingContext2D;
  public x: number;
  public y: number;
  public size: number;
  public color: string;

  constructor(params: PlayerParams) {
    this.context = params.context;
    this.x = params.x;
    this.y = params.y;
    this.size = params.size;
    this.color = params.color;
  }

  public update(): void {
    this.draw();
    this.move();
  }

  private draw(): void {
    this.context.beginPath();
    this.context.rect(this.x, this.y, 50, 50);
    this.context.closePath();

    this.context.fillStyle = this.color;
    this.context.fill();
  }
  
  private move(): void {
    if (this.x < this.context.canvas.width)
      this.x += 1;
    else
      this.x = 0;
  }
}