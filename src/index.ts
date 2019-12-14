import Scene from './scenes/sceneBase';
import GameScene from './scenes/gameScene';
import PlayerParams from './dtos/playerParams';
import SceneParams from './dtos/sceneParams';

class Game {
  private readonly context: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private scenes: Scene[] = [];

  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    this.context = this.canvas.getContext('2d');

    this.scenes.push(new GameScene(<SceneParams>{context: this.context, name: 'game', active: true}));
    

    window.requestAnimationFrame(() => this.update());
  }

  public update(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.scenes.forEach(scene => {
      if (scene.active)
        scene.update();
    });

    window.requestAnimationFrame(() => this.update());
  }
}

window.onload = () => {
  const game = new Game();
};