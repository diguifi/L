import PlayerParams from '../dtos/playerParams';
import { darken } from '../managers/colorManager';

export default class Player {
  private context: CanvasRenderingContext2D;
  private rotation: number = 0;
  private inverted: boolean = false;
  public x: number;
  public y: number;
  public size: number;
  public color: string;
  public myTurn: boolean = false;

  constructor(params: PlayerParams) {
    this.context = params.context;
    this.x = params.x;
    this.y = params.y;
    this.size = params.size;
    this.color = params.color;
    this.myTurn = params.myTurn;
  }

  public update(): void {
    this.draw();
  }

  private draw(): void {
    switch(this.rotation) {
      case 0:
        this.context.beginPath();
        if (!this.inverted)
          this.context.rect(this.x, this.y, this.size, this.size);
        else
          this.context.rect(this.x + this.size * 2, this.y, this.size, this.size);
        this.context.rect(this.x + this.size, this.y, this.size, this.size);
        this.context.rect(this.x + this.size, this.y + this.size, this.size, this.size);
        this.context.rect(this.x + this.size, this.y + this.size * 2, this.size, this.size);
        this.context.closePath();
        break;
      case 1:
        this.context.beginPath();
        if (!this.inverted)
          this.context.rect(this.x + this.size * 2, this.y, this.size, this.size);
        else
          this.context.rect(this.x + this.size * 2, this.y + this.size * 2, this.size, this.size);
        this.context.rect(this.x + this.size * 2, this.y + this.size, this.size, this.size);
        this.context.rect(this.x + this.size, this.y + this.size, this.size, this.size);
        this.context.rect(this.x, this.y + this.size, this.size, this.size);
        this.context.closePath();
        break;
      case 2:
        this.context.beginPath();
        if (!this.inverted)
          this.context.rect(this.x + this.size * 2, this.y + this.size * 2, this.size, this.size);
        else
          this.context.rect(this.x, this.y + this.size * 2, this.size, this.size);
        this.context.rect(this.x + this.size, this.y + this.size * 2, this.size, this.size);
        this.context.rect(this.x + this.size, this.y + this.size, this.size, this.size);
        this.context.rect(this.x + this.size, this.y, this.size, this.size);
        this.context.closePath();
        break;
      case 3:
        this.context.beginPath();
        if (!this.inverted)
          this.context.rect(this.x, this.y + this.size * 2, this.size, this.size);
        else
          this.context.rect(this.x, this.y, this.size, this.size);
        this.context.rect(this.x, this.y + this.size, this.size, this.size);
        this.context.rect(this.x + this.size, this.y + this.size, this.size, this.size);
        this.context.rect(this.x + this.size * 2, this.y + this.size, this.size, this.size);
        this.context.closePath();
        break;
    }

    if (this.myTurn)
      this.context.fillStyle = this.color;
    else
      this.context.fillStyle = darken(this.color, 10);
    this.context.fill();
  }

  public rotate(): void {
    if (this.rotation < 3)
      this.rotation++;
    else
      this.rotation = 0;
  }

  public invert(): void {
    this.inverted = !this.inverted;
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