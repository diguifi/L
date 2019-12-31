import Scene from './sceneBase';
import Player from '../objects/player';
import Board from '../objects/board';
import PlayerParams from '../dtos/playerParams';
import BoardParams from '../dtos/boardParams';
import SceneParams from '../dtos/sceneParams';
import InputManager from '../managers/inputManager';

export default class GameScene extends Scene {
  private board: Board;
  private player1: Player;
  private player2: Player;
  private slotSize: number = 50;
  private inputManager: InputManager;

  constructor(params: SceneParams) {
    super(params.context, params.name, params.active);

    this.board = new Board(<BoardParams>{
      context: this.context,
      x: 0,
      y: 0,
      size: this.slotSize,
      color: 'gray',
    });

    this.player1 = new Player(<PlayerParams>{
      context: this.context,
      x: this.slotSize,
      y: 0,
      size: this.slotSize,
      color: 'blue',
      myTurn: true,
    });

    this.player2 = new Player(<PlayerParams>{
      context: this.context,
      x: this.slotSize,
      y: this.slotSize,
      size: this.slotSize,
      color: 'red',
      myTurn: false,
    });
    this.player2.rotate();
    this.player2.rotate();
    this.player2.moveLeft();

    this.inputManager = new InputManager(this.player1, this.player2);
  }

  public update(): void {
    this.board.update();
    this.player1.update();
    this.player2.update();
  }
}