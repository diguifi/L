export default class Scene {
  public context: CanvasRenderingContext2D;
  public name: string;
  public active: boolean = false;

  constructor(context: CanvasRenderingContext2D, name: string, active: boolean) {
    this.context = context;
    this.name = name;
    this.active = active;
  }

  public update(): void{  }
}