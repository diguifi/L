import Scene from './sceneBase';
import Player from '../objects/player';
import PlayerParams from '../dtos/playerParams';
import SceneParams from '../dtos/sceneParams';

export default class GameScene extends Scene{
  private player1: Player;
  private player2: Player;
  private slotSize: number = 50;

  constructor(params: SceneParams) {
    super(params.context, params.name, params.active);

    this.player1 = new Player(<PlayerParams>{
      context: this.context,
      x: this.slotSize,
      y: this.slotSize,
      size: this.slotSize,
      color: 'blue'
    });

    this.player2 = new Player(<PlayerParams>{
      context: this.context,
      x: this.slotSize,
      y: this.slotSize,
      size: this.slotSize,
      color: 'red'
    });
    this.player2.rotate();
    this.player2.rotate();
    this.player2.moveDown();
    this.player2.moveLeft();
  }

  public update(): void {
    this.player1.update();
    this.player2.update();
  }
}