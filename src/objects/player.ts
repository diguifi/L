import PlayerParams from '../dtos/playerParams';
import { darken } from '../managers/colorManager';
import ConnectionManager from '../managers/connectionManager';
import PlayerFirebaseParams from '../dtos/playerFirebaseParams';

export default class Player {
  private context: CanvasRenderingContext2D;
  private firstTick: boolean = true;
  public rotation: number = 0;
  public inverted: boolean = false;
  public connectionManager: ConnectionManager;
  public x: number;
  public y: number;
  public size: number;
  public color: string;
  public myTurn: boolean = false;
  public playerNumber: number = 0;
  public matrixPosition: any[] = [];
  public previousMatrixPosition: any[] = [];

  constructor(params: PlayerParams) {
    this.context = params.context;
    this.x = params.x;
    this.y = params.y;
    this.size = params.size;
    this.color = params.color;
    this.myTurn = params.myTurn;
    this.playerNumber = params.playerNumber;
    this.connectionManager = params.connectionManager;
  }

  public update(): void {
    this.draw();
    this.matrixPosition = this.calculatePositionOnMatrix();

    if (!this.connectionManager.myTurn) {
      if (this.firstTick) {
        this.firstTick = false;
        this.uploadPlayerPosition();
      }
    }
  }

  private draw(): void {
    this.context.beginPath();
    switch(this.rotation) {
      case 0:
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

  private calculatePositionOnMatrix(): any[] {
    let matrix = [[0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0],];

    let squareNumber = 0;
    let emptySpots = [];
    let height = 3;
    let width = 2;
    let placementAdjusterX = 0;
    let placementAdjusterY = 0;

    switch(this.rotation) {
      case 0:
        height = 3;
        width = 2;

        if (!this.inverted) {
          emptySpots = [3,5];
        }
        else {
          emptySpots = [4,6];
          placementAdjusterX = this.size;
        }
        break;
      case 1:
        height = 2;
        width = 3;

        if (!this.inverted) {
          emptySpots = [1,2];
        }
        else {
          emptySpots = [4,5];
          placementAdjusterY = this.size;
        }
        break;
      case 2:
        height = 3;
        width = 2;

        if (!this.inverted) {
          emptySpots = [2,4];
          placementAdjusterX = this.size;
        }
        else {
          emptySpots = [1,3];
        }
        break;
      case 3:
        height = 2;
        width = 3;

        if (!this.inverted) {
          emptySpots = [5,6];
          placementAdjusterY = this.size;
        }
        else {
          emptySpots = [2,3];
        }
        break;
    }

    for(let i = (this.y + placementAdjusterY)/this.size; i<((this.y + placementAdjusterY)/this.size) + height;i++) {
      for (let j = (this.x + placementAdjusterX)/this.size; j < ((this.x + placementAdjusterX)/this.size) + width; j++) {
        squareNumber++;
        if (squareNumber != emptySpots[0] && squareNumber != emptySpots[1]) {
          if ((i >= 0 && i < matrix.length) && (j >= 0 && j < matrix[0].length))
            matrix[i][j] = this.playerNumber;
          else
            matrix[0][0] = 9;
        }
      }
    }

    let piecesOnBoard = 0;
    for(let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j] == this.playerNumber) {
          piecesOnBoard++;
        }
      }
    }
    if (piecesOnBoard != 4) {
      matrix[0][0] = 9;
    }
    

    if (this.previousMatrixPosition.length === 0) {
      this.previousMatrixPosition = matrix.splice(0);
    } else {
      if (!this.myTurn) {
        this.previousMatrixPosition = matrix.splice(0);
      }
    }

    if (this.matrixEqual(this.previousMatrixPosition, matrix)) {
      matrix[0][0] = 8;
    }

    return matrix;
  }

  private matrixEqual(a: any[], b: any[]): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    let test = true;
    for (var i = 0; i < a.length; ++i) {
      test = this.arraysEqual(a[i], b[i]);

      if (!test) return false;
    }
    return true;
  }

  private arraysEqual(a: any[], b: any[]): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  public rotate(): void {
    if (this.rotation < 3){
      this.rotation++;
    }
    else {
      this.rotation = 0;
    }

    this.uploadPlayerPosition();
  }

  public invert(): void {
    this.inverted = !this.inverted;
    this.uploadPlayerPosition();
  }

  public moveRight(): void {
    this.x += this.size;
    this.uploadPlayerPosition();
  }

  public moveLeft(): void {
    this.x -= this.size;
    this.uploadPlayerPosition();
  }

  public moveDown(): void {
    this.y += this.size;
    this.uploadPlayerPosition();
  }

  public moveUp(): void {
    this.y -= this.size;
    this.uploadPlayerPosition();
  }

  public uploadPlayerPosition(): void {
    if (this.connectionManager.isHost && (this.playerNumber == 1)) {
      this.connectionManager.firebaseDB.ref(this.connectionManager.gameGuid).child('room').child('player1').update(
      <PlayerFirebaseParams>{
        rotation: this.rotation,
        inverted: this.inverted,
        x: this.x,
        y: this.y,
      });
    }
    else {
      this.connectionManager.firebaseDB.ref(this.connectionManager.gameGuid).child('room').child('player2').update(
      <PlayerFirebaseParams>{
        rotation: this.rotation,
        inverted: this.inverted,
        x: this.x,
        y: this.y,
      });
    }
  }
}