import Scene from './sceneBase';
import Player from '../objects/player';
import Coin from '../objects/coin';
import Board from '../objects/board';
import PlayerParams from '../dtos/playerParams';
import CoinParams from '../dtos/coinParams';
import BoardParams from '../dtos/boardParams';
import SceneParams from '../dtos/sceneParams';
import GameManager from '../managers/gameManager';

export default class GameScene extends Scene {
  private board: Board;
  private player1: Player;
  private player2: Player;
  private coin1: Coin;
  private coin2: Coin;
  private slotSize: number = 90;
  private maxTime: number = 25;
  private gameManager: GameManager;
  private destroyed: boolean = false;

  constructor(params: SceneParams) {
    super(params.context, params.name, params.active);

    this.board = new Board(<BoardParams>{
      context: this.context,
      x: 0,
      y: 0,
      size: this.slotSize,
      color: '#bdc3c7',
    });

    this.player1 = new Player(<PlayerParams>{
      context: this.context,
      x: this.slotSize,
      y: 0,
      size: this.slotSize,
      color: '#2ecc71',
      myTurn: true,
      playerNumber: 1,
    });

    this.player2 = new Player(<PlayerParams>{
      context: this.context,
      x: this.slotSize,
      y: this.slotSize,
      size: this.slotSize,
      color: '#e74c3c',
      myTurn: false,
      playerNumber: 2,
    });
    this.player2.rotate();
    this.player2.rotate();
    this.player2.moveLeft();

    this.coin1 = new Coin(<CoinParams>{
      context: this.context,
      x: 0,
      y: 0,
      size: this.slotSize,
      color: '#f1c40f',
      coinNumber: 3,
    });

    this.coin2 = new Coin(<CoinParams>{
      context: this.context,
      x: this.slotSize * 3,
      y: this.slotSize * 3,
      size: this.slotSize,
      color: '#f1c40f',
      coinNumber: 4,
    });

    this.gameManager = new GameManager(this.player1, this.player2, this.coin1, this.coin2, this.board, this.maxTime);
  }

  public update(): void {
    if (!this.destroyed) {
      this.board.update();
      this.player1.update();
      this.player2.update();
      this.coin1.update();
      this.coin2.update();
    }
  }

  public destroy(): void{
    this.destroyed = true; 
    this.gameManager.destroy();
    this.gameManager = null;
    this.board = null;
    this.player1 = null;
    this.player2 = null;
    this.coin1 = null;
    this.coin2 = null;
    this.slotSize = null;
    this.destroyed = null;
    this.maxTime = null;
  }
}