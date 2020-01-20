import Game from "..";

export default class Scene {
  public context: CanvasRenderingContext2D;
  public name: string;
  public active: boolean = false;
  public game: Game;

  constructor(context: CanvasRenderingContext2D, name: string, active: boolean, game: Game) {
    this.context = context;
    this.name = name;
    this.active = active;
    this.game = game;
  }

  public update(): void{ /* call all update functions that need to be triggered every frame */ }
  public destroy(): void{ /* deactivate any parallel processes and set all properties to null */ }
}