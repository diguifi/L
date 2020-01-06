import Player from '../objects/player';
import GameManager from './gameManager';

export default class InputManager {
  private players: Player[] = [];
  private gameManager: GameManager;
  private switch: boolean = false;

  constructor (gameManager: GameManager, player1: Player, player2: Player) {
    this.gameManager = gameManager;
    this.players.push(player1);
    this.players.push(player2);

    document.onkeydown = this.checkInputs.bind(this);
  }

  private checkInputs(e: any): any {
    e = e || window.event;

    this.players.forEach(player => {
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

    if (this.switch) {
      this.switch = false;
      this.gameManager.switchTurns();
    }
  }
}