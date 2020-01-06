import Player from '../objects/player';
import Coin from '../objects/coin';
import InputManager from './inputManager';
import Board from '../objects/board';

export default class GameManager {
  private players: Player[] = [];
  private coins: Coin[] = [];
  private board: Board;
  private inputManager: InputManager;
  private switch: boolean = false;

  constructor (player1: Player, player2: Player,
    coin1: Coin, coin2: Coin,
    board: Board) {
    this.players.push(player1);
    this.players.push(player2);

    this.coins.push(coin1);
    this.coins.push(coin2);

    this.board = board;

    this.inputManager = new InputManager(this, player1, player2);
  }

  public switchTurns(): void {
    this.players[0].myTurn = !this.players[0].myTurn;
    this.players[1].myTurn = !this.players[1].myTurn;
  }
}