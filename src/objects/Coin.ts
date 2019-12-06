export class Coin extends Phaser.GameObjects.Sprite {
  private isPressed: boolean = false;
  private sizeFactor: number = 20;
  private step: number = 60;
  private isActive: boolean = false;

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);

    
    this.sizeFactor = params.sizeFactor;
    this.step = this.sizeFactor * 3;
    this.scaleX = this.sizeFactor;
    this.scaleY = this.sizeFactor;
  }

  create(): void {
    this.setInteractive();
  }

  preUpdate(): void {
    this.update();
  }
   
  update(): void {
    
  }
}