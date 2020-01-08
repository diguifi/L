import CoinParams from '../dtos/coinParams';
import { darken } from '../managers/colorManager';

export default class Coin {
  private context: CanvasRenderingContext2D;
  public x: number;
  public y: number;
  public size: number;
  public color: string;
  public selected: boolean = false;
  public active: boolean = false;

  constructor(params: CoinParams) {
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
    this.context.rect(this.x, this.y, this.size, this.size);
    this.context.closePath();

    if (this.active)
      this.context.fillStyle = this.color;
    else
      this.context.fillStyle = darken(this.color, 10);
    this.context.fill();
  }

  public moveRight(): void {
    this.x += this.size;
  }

  public moveLeft(): void {
    this.x -= this.size;
  }

  public moveDown(): void {
    this.y += this.size;
  }

  public moveUp(): void {
    this.y -= this.size;
  }
}