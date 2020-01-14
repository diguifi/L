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
  public coinNumber: number = 0;
  public matrixPosition: any[] = [];

  constructor(params: CoinParams) {
    this.context = params.context;
    this.x = params.x;
    this.y = params.y;
    this.size = params.size;
    this.color = params.color;
    this.coinNumber = params.coinNumber;
  }

  public update(): void {
    this.draw();
    this.matrixPosition = this.calculatePositionOnMatrix();
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

  private calculatePositionOnMatrix(): any[] {
    let matrix = [[0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0],];
      
    let y = this.y/this.size;
    let x = this.x/this.size;

    if ((y >= 0 && y < matrix.length) && (x >= 0 && x < matrix[0].length))
      matrix[y][x] = this.coinNumber;
    else
      matrix[0][0] = 9;

    return matrix;
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