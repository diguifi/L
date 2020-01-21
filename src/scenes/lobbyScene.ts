import Scene from './sceneBase';
import SceneParams from '../dtos/sceneParams';
import ConnectionManager from '../managers/connectionManager';

export default class LobbyScene extends Scene {
  public connectionManager: ConnectionManager;
  public destroyed: boolean = false;
  public startedGame: boolean = false;

  constructor(params: SceneParams) {
    super(params.context, params.name, params.active, params.game);

    this.connectionManager = new ConnectionManager();
  }

  private startGameScene(): void {
    this.game.addGameScene(true, this.connectionManager);
    this.startedGame = true;
  }
  private drawConnecting(): void {
    this.context.textAlign = 'center';
    this.context.font = '30px Arial';
    this.context.fillText('Connecting...', ((this.context.canvas.width) / 2), ((this.context.canvas.height) / 2));
  }
  private drawError(): void {
    this.context.textAlign = 'center';
    this.context.font = '30px Arial';
    this.context.fillText(this.connectionManager.errorMessage, ((this.context.canvas.width) / 2), ((this.context.canvas.height) / 2));
  }
  private drawWaiting(): void {
    this.context.textAlign = 'center';
    this.context.font = '30px Arial';
    this.context.fillText('Waiting for player', ((this.context.canvas.width) / 2), ((this.context.canvas.height) / 2));
    this.context.font = '22px Arial';
    this.context.fillText('send the link to a friend!', ((this.context.canvas.width) / 2), ((this.context.canvas.height + 65) / 2));
  }

  public update(): void {
    if (!this.destroyed && !this.startedGame) {
      if (this.connectionManager.connected && !this.connectionManager.error) {
        this.startGameScene();
      } else {
        if (this.connectionManager.error) {
          this.drawError();
        } else if (this.connectionManager.waitingPlayer) {
          this.drawWaiting();
        } else {
          this.drawConnecting();
        }
      }
    }
  }

  public destroy(): void{
    this.destroyed = true;
  }
}