import BoardParams from '../dtos/boardParams';

export default class Board {
  private context: CanvasRenderingContext2D;
  public x: number;
  public y: number;
  public size: number;
  public color: string;

  constructor(params: BoardParams) {
    this.context = params.context;
    this.x = params.x;
    this.y = params.y;
    this.size = params.size;
    this.color = params.color;
  }

  public update(): void {
    this.draw();
  }

  private draw(): void {
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.size * 4, this.size * 4);
    this.context.closePath();
    this.context.fillStyle = this.color;
    this.context.fill();
  }
}