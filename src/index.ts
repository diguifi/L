import Scene from './scenes/sceneBase';
import GameScene from './scenes/gameScene';
import SceneParams from './dtos/sceneParams';

class Game {
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

  private addGameScene(): void {
    this.scenes.push(new GameScene(<SceneParams>{context: this.context, name: 'game', active: true}));
  }
  private removeGameScene(): void {
    this.scenes.forEach((scene, index, object) => {
      if (scene.name === 'game') {
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
    this.addGameScene();
  }

  public goToHome(): void {
    document.getElementById('gamePage').style.display = 'none';
    document.getElementById('homePage').style.display = 'block';
    this.removeGameScene();
  }
}

window.onload = () => {
  const game = new Game();
};