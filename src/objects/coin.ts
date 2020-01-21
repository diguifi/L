import CoinParams from '../dtos/coinParams';
import { darken } from '../managers/colorManager';
import ConnectionManager from '../managers/connectionManager';

export default class Coin {
  private context: CanvasRenderingContext2D;
  private firstTick: boolean = true;
  public connectionManager: ConnectionManager;
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
    this.connectionManager = params.connectionManager;
  }

  public update(): void {
    this.draw();
    this.matrixPosition = this.calculatePositionOnMatrix();

    if (!this.connectionManager.myTurn) {
      if (this.firstTick) {
        this.firstTick = false;
        this.uploadCoinPosition();
      }
      else {
        if (this.coinNumber == 3){
          this.x = this.connectionManager.coin3.x;
          this.y = this.connectionManager.coin3.y;
        }
        else {
          this.x = this.connectionManager.coin4.x;
          this.y = this.connectionManager.coin4.y;
        }
      }
    }
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
    this.uploadCoinPosition();
  }

  public moveLeft(): void {
    this.x -= this.size;
    this.uploadCoinPosition();
  }

  public moveDown(): void {
    this.y += this.size;
    this.uploadCoinPosition();
  }

  public moveUp(): void {
    this.y -= this.size;
    this.uploadCoinPosition();
  }

  public uploadCoinPosition(): void {
    if (this.connectionManager.isHost && (this.coinNumber == 3)) {
      this.connectionManager.firebaseDB.ref(this.connectionManager.gameGuid).child('room').child('coin3').update({
        x: this.x,
        y: this.y,
      });
    }
    else {
      this.connectionManager.firebaseDB.ref(this.connectionManager.gameGuid).child('room').child('coin4').update({
        x: this.x,
        y: this.y,
      });
    }
  }
}