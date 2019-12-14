import Scene from './sceneBase';
import Player from '../objects/player';
import PlayerParams from '../dtos/playerParams';
import SceneParams from '../dtos/sceneParams';

export default class GameScene extends Scene{
  private player1: Player;

  constructor(params: SceneParams) {
    super(params.context, params.name, params.active);

    this.player1 = new Player(<PlayerParams>{
      context: this.context,
      x: 50,
      y: 50,
      size: 10,
      color: 'blue'
    })
  }

  public update(): void {
    this.player1.update();
  }
}