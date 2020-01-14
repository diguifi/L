import Player from '../objects/player';
import Coin from '../objects/coin';
import InputManager from './inputManager';
import Board from '../objects/board';

enum errorCodes {
  outOfBoard = 9,
  samePositionAsBefore = 8,
}

export default class GameManager {
  public players: Player[] = [];
  public coinRound: boolean = false;
  public selectingCoin: boolean = false;
  public coins: Coin[] = [];
  private board: Board;
  private turnElement: HTMLElement = document.getElementById('turn');
  private errorsElement: HTMLElement = document.getElementById('errors');
  private errorMessage: string = '';
  private showingError: boolean = false;
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

    this.turnElement.innerHTML = `Turn: Player ${this.players[0].myTurn?'1' : '2'}`

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

    this.turnElement.innerHTML = `Turn: Player ${this.players[0].myTurn?'1' : '2'}`
  }

  private validMove(): boolean {
    let valid = true;

    if (!this.selectingCoin) {
      if (!this.coinRound) {
        this.players.forEach(player => {
          if (player.myTurn) {
            if (player.matrixPosition[0][0] === errorCodes.outOfBoard) {
              valid = false;
              this.errorMessage = 'Player out of the board!';
            }
            else if (player.matrixPosition[0][0] === errorCodes.samePositionAsBefore) {
              valid = false;
              this.errorMessage = 'You must move your piece!';
            }
            else {
              for (let i = 0; i < this.boardMatrix.length; i++) {
                for (let j = 0; j < this.boardMatrix[0].length; j++) {
                  if (player.matrixPosition[i][j] === player.playerNumber) {
                    if (this.boardMatrix[i][j] !== 0 && this.boardMatrix[i][j] !== player.playerNumber) {
                      valid = false; /* overlapping */
                      this.errorMessage = 'Invalid move!';
                    }
                  }
                }
              }
            }
          }
        });
      } else {
        this.coins.forEach(coin => {
          if (coin.active) {
            if (coin.matrixPosition[0][0] === errorCodes.outOfBoard) {
              valid = false;
              this.errorMessage = 'Coin is out of the board!';
            }
            else {
              for (let i = 0; i < this.boardMatrix.length; i++) {
                for (let j = 0; j < this.boardMatrix[0].length; j++) {
                  if (coin.matrixPosition[i][j] === coin.coinNumber) {
                    if (this.boardMatrix[i][j] !== 0 && this.boardMatrix[i][j] !== coin.coinNumber) {
                      valid = false;
                      this.errorMessage = 'Invalid move!';
                    }
                  }
                }
              }
            }
          }
        });
      }
      console.log('valid move: ' + valid);
    }

    if (valid) {
      this.errorMessage = '';
    }
    else {
      this.showError();
    }

    return valid;
  }

  private updateBoardMatrix(): void {
    if (!this.selectingCoin) {
      if (!this.coinRound) {
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
        console.log('placed player');
      } else {
        this.coins.forEach(coin => {
          if (coin.active) {
            for (let i = 0; i < this.boardMatrix.length; i++) {
              for (let j = 0; j < this.boardMatrix[0].length; j++) {
                if (this.boardMatrix[i][j] === coin.coinNumber) {
                  this.boardMatrix[i][j] = 0;
                }
              }
            }
      
            for (let i = 0; i < this.boardMatrix.length; i++) {
              for (let j = 0; j < this.boardMatrix[0].length; j++) {
                if (coin.matrixPosition[i][j] === coin.coinNumber) {
                  this.boardMatrix[i][j] = coin.coinNumber;
                }
              }
            }
          }
        });
        console.log('placed coin');
      }
      console.log(this.boardMatrix);
    }
  }

  private showError(): void {
    this.errorsElement.innerHTML = this.errorMessage;
    
    if (!this.showingError) {
      this.showingError = true;
      this.errorsElement.style.opacity = '1';
      this.errorsElement.classList.add('fade-out');

      setTimeout(() => {
        this.showingError = false;
        this.errorsElement.classList.remove('fade-out');
        this.errorsElement.style.opacity = '0';
      }, 2000);
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