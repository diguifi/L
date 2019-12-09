export class Board extends Phaser.GameObjects.Sprite {
  private sizeFactor: number = 20;

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);

    this.scene.physics.world.enable(this);

    this.sizeFactor = params.sizeFactor;
    this.scaleX = this.sizeFactor;
    this.scaleY = this.sizeFactor;
  }

  preUpdate(): void {
    this.update();
  }
   
  update(): void {
    
  }
}