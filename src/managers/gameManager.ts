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

  public changeGameState(): void {
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

  public changeActiveCoin(): void {
    this.coins.forEach(coin => {
      coin.active = !coin.active;
    });
  }
}