import Player from '../objects/player';
import Coin from '../objects/coin';
import InputManager from './inputManager';
import Board from '../objects/board';

export default class GameManager {
  public players: Player[] = [];
  public coinRound: boolean = false;
  public selectingCoin: boolean = false;
  public coins: Coin[] = [];
  private board: Board;
  private inputManager: InputManager;
  private boardMatrix: any[] = [[3,1,1,0],
                                [0,2,1,0],
                                [0,2,1,0],
                                [0,2,2,4]];

  constructor (player1: Player, player2: Player,
    coin1: Coin, coin2: Coin,
    board: Board) {
    this.players.push(player1);
    this.players.push(player2);

    this.coins.push(coin1);
    this.coins.push(coin2);

    this.board = board;

    this.inputManager = new InputManager(this);
  }

  private activateCoinSelection(): void {
    this.selectingCoin = true;
    this.coins[0].active = true;
  }

  private activateCoinRound(): void {
    this.selectingCoin = false;
    this.coinRound = true;
  }

  private finishCoinRound(): void {
    this.coinRound = false;
    this.coins[0].active = false;
    this.coins[1].active = false;
  }

  private switchTurns(): void {
    this.players[0].myTurn = !this.players[0].myTurn;
    this.players[1].myTurn = !this.players[1].myTurn;
  }

  private validMove(): boolean {
    let valid = true;

    this.players.forEach(player => {
      if (player.myTurn) {
        if (player.matrixPosition[0][0] === 9)
          valid = false;
        else {
          for (let i = 0; i < this.boardMatrix.length; i++) {
            for (let j = 0; j < this.boardMatrix[0].length; j++) {
              if (player.matrixPosition[i][j] === player.playerNumber) {
                if (this.boardMatrix[i][j] !== 0 && this.boardMatrix[i][j] !== player.playerNumber)
                  valid = false;
              }
            }
          }
        }
      }
    });

    return valid;
  }

  private updateBoardMatrix(): void {
    if (!this.coinRound && !this.selectingCoin) {
      this.players.forEach(player => {
        if (player.myTurn) {
          for (let i = 0; i < this.boardMatrix.length; i++) {
            for (let j = 0; j < this.boardMatrix[0].length; j++) {
              if (this.boardMatrix[i][j] === player.playerNumber) {
                this.boardMatrix[i][j] = 0;
              }
            }
          }
    
          for (let i = 0; i < this.boardMatrix.length; i++) {
            for (let j = 0; j < this.boardMatrix[0].length; j++) {
              if (player.matrixPosition[i][j] === player.playerNumber) {
                this.boardMatrix[i][j] = player.playerNumber;
              }
            }
          }
        }
      });

      console.log(this.boardMatrix);
    }
  }

  public update(): void {
    
  }

  public changeGameState(): void {
    if (this.validMove()) {
      this.updateBoardMatrix();

      if (!this.coinRound) {
        if (!this.selectingCoin) {
          this.activateCoinSelection();
        } else {
          this.activateCoinRound();
        }
      } else {
        this.finishCoinRound();
        this.switchTurns();
      }
    }
  }

  public changeActiveCoin(): void {
    this.coins.forEach(coin => {
      coin.active = !coin.active;
    });
  }
}