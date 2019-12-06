export class Player extends Phaser.GameObjects.Sprite {
  private invertKey: Phaser.Input.Keyboard.Key;
  private rotateKey: Phaser.Input.Keyboard.Key;
  private moveLeft: Phaser.Input.Keyboard.Key;
  private moveRight: Phaser.Input.Keyboard.Key;
  private moveUp: Phaser.Input.Keyboard.Key;
  private moveDown: Phaser.Input.Keyboard.Key;
  private isPressed: boolean = false;
  private sizeFactor: number = 20;
  private step: number = 60;
  public myTurn: boolean = true;
  public activateCoin: boolean = false;

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);

    this.myTurn = params.myTurn;
    this.sizeFactor = params.sizeFactor;
    this.step = this.sizeFactor * 3;
    this.scaleX = this.sizeFactor;
    this.scaleY = this.sizeFactor;

    this.invertKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
    this.rotateKey =  this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.moveLeft =  this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.moveRight =  this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.moveUp =  this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.moveDown =  this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  }

  preUpdate(): void {
    this.update();
  }
   
  update(): void {
    this.showTurn();

    if (!this.isPressed) {
      if (this.myTurn) {
        if (!this.activateCoin)
          this.checkInputs();
      }

      if (this.anyKeyDown()) {
        this.isPressed = true;
      }
    } else {
      if (!this.anyKeyDown()) {
        this.isPressed = false;
      }
    }
  }

  private anyKeyDown(): boolean {
    return ((this.invertKey.isDown) || 
    (this.rotateKey.isDown) || 
    (this.moveLeft.isDown) || 
    (this.moveRight.isDown) || 
    (this.moveUp.isDown) || 
    (this.moveDown.isDown))
  }

  private checkInputs(): void {
    if (this.invertKey.isDown) {
      this.scaleX *= -1;
    }
    if (this.rotateKey.isDown) {
      this.angle += 90;
    }
    if (this.moveLeft.isDown) {
      this.x -= this.step;
    }
    if (this.moveRight.isDown) {
      this.x += this.step;
    }
    if (this.moveUp.isDown) {
      this.y -= this.step;
    }
    if (this.moveDown.isDown) {
      this.y += this.step;
    }
  }

  private showTurn(): void {
    if (!this.myTurn || this.activateCoin) {
      this.tint = 0x888888;
    } else {
      this.clearTint();
    }
  }
}