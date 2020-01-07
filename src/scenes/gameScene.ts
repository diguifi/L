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
  private slotSize: number = 50;
  private gameManager: GameManager;

  constructor(params: SceneParams) {
    super(params.context, params.name, params.active);

    this.board = new Board(<BoardParams>{
      context: this.context,
      x: 0,
      y: 0,
      size: this.slotSize,
      color: '#7f8c8d',
    });

    this.player1 = new Player(<PlayerParams>{
      context: this.context,
      x: this.slotSize,
      y: 0,
      size: this.slotSize,
      color: '#3498db',
      myTurn: true,
    });

    this.player2 = new Player(<PlayerParams>{
      context: this.context,
      x: this.slotSize,
      y: this.slotSize,
      size: this.slotSize,
      color: '#e74c3c',
      myTurn: false,
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
    });

    this.coin2 = new Coin(<CoinParams>{
      context: this.context,
      x: this.slotSize * 3,
      y: this.slotSize * 3,
      size: this.slotSize,
      color: '#f1c40f',
    });

    this.gameManager = new GameManager(this.player1, this.player2, this.coin1, this.coin2, this.board);
  }

  public update(): void {
    this.board.update();
    this.player1.update();
    this.player2.update();
    this.coin1.update();
    this.coin2.update();
  }
}