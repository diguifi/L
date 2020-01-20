import Scene from './scenes/sceneBase';
import GameScene from './scenes/gameScene';
import SceneParams from './dtos/sceneParams';
import LobbyScene from './scenes/lobbyScene';
import ConnectionManager from './managers/connectionManager';

export default class Game {
  private readonly context: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private playBtn: HTMLElement = document.getElementById('goToGame');
  private exitBtn: HTMLElement = document.getElementById('goToHome');
  private scenes: Scene[] = [];
  private inGame: boolean = false;

  constructor() {
    this.playBtn.onclick = (() => {
      this.goToGame();
    });
    this.exitBtn.onclick = (() => {
      this.goToHome();
    });

    this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    this.context = this.canvas.getContext('2d');

    window.requestAnimationFrame(() => this.update());
  }
  private removeScenes() {
    this.removeGameScene();
    this.removeLobbyScene();
  }

  public addGameScene(active: boolean, connectionManager: ConnectionManager): void {
    this.scenes.push(new GameScene(<SceneParams>{context: this.context, name: 'game', active: active, game: this, connectionManager: connectionManager}));
  }
  public removeGameScene(): void {
    this.scenes.forEach((scene, index, object) => {
      if (scene.name === 'game') {
        scene.destroy();
        scene = null;
        object.splice(index, 1);
      }
    });
  }
  public addLobbyScene(active: boolean): void {
    this.scenes.push(new LobbyScene(<SceneParams>{context: this.context, name: 'lobby', active: active, game: this, connectionManager: null}));
  }
  public removeLobbyScene(): void {
    this.scenes.forEach((scene, index, object) => {
      if (scene.name === 'lobby') {
        scene.destroy();
        scene = null;
        object.splice(index, 1);
      }
    });
  }

  public update(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.scenes.forEach(scene => {
      if (scene.active)
        scene.update();
    });

    window.requestAnimationFrame(() => this.update());
  }

  public goToGame(): void {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'block';
    this.addLobbyScene(true);
  }

  public goToHome(): void {
    document.getElementById('gamePage').style.display = 'none';
    document.getElementById('homePage').style.display = 'block';
    this.removeScenes();
  }
}

window.onload = () => {
  const game = new Game();
};