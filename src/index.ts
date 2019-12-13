import Player from './objects/player';
import PlayerParams from './dtos/playerParams';

class Game {
  private readonly context: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private testPlayer: Player;

  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    this.context = this.canvas.getContext('2d');

    this.testPlayer = new Player(<PlayerParams>{
      context: this.context,
      x: 50,
      y: 50,
      size: 10,
      color: 'blue'
    });
    

    window.requestAnimationFrame(() => this.update());
  }

  public update(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawTestPlayer();

    window.requestAnimationFrame(() => this.update());
  }

  public drawTestPlayer() {
    this.testPlayer.update();
  }
}

window.onload = () => {
  const game = new Game();
};