import Player from '../objects/player';
import GameManager from './gameManager';

export default class InputManager {
  private gameManager: GameManager;
  private switch: boolean = false;

  constructor (gameManager: GameManager) {
    this.gameManager = gameManager;

    document.onkeydown = this.checkInputs.bind(this);
  }

  private checkInputs(e: any): any {
    e = e || window.event;

    if (!this.gameManager.selectingCoin && !this.gameManager.coinRound) {
      this.gameManager.players.forEach(player => {
        if (player.myTurn) {
          if (e.keyCode == '38') {
            player.moveUp();
          }
          else if (e.keyCode == '40') {
            player.moveDown();
          }
          else if (e.keyCode == '37') {
            player.moveLeft();
          }
          else if (e.keyCode == '39') {
            player.moveRight();
          }
          else if (e.keyCode == '32') {
            player.rotate();
          }
          else if (e.keyCode == '17') {
            player.invert();
          }
          else if (e.keyCode == '13') {
            this.switch = true;
          }
        }
      });
    } else {
      if (!this.gameManager.coinRound) {
        if (e.keyCode == '37') {
          this.gameManager.changeActiveCoin();
        }
        else if (e.keyCode == '39') {
          this.gameManager.changeActiveCoin();
        }
        else if (e.keyCode == '13') {
          this.switch = true;
        }
      } else {
        this.gameManager.coins.forEach(coin => {
          if (coin.active) {
            if (e.keyCode == '38') {
              coin.moveUp();
            }
            else if (e.keyCode == '40') {
              coin.moveDown();
            }
            else if (e.keyCode == '37') {
              coin.moveLeft();
            }
            else if (e.keyCode == '39') {
              coin.moveRight();
            }
            else if (e.keyCode == '13') {
              this.switch = true;
            }
          }
        });
      }
    }

    if (this.switch) {
      this.switch = false;
      this.gameManager.changeGameState();
    }
  }
}