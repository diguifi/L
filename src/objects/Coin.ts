export class Coin extends Phaser.GameObjects.Sprite {
  private moveLeft: Phaser.Input.Keyboard.Key;
  private moveRight: Phaser.Input.Keyboard.Key;
  private moveUp: Phaser.Input.Keyboard.Key;
  private moveDown: Phaser.Input.Keyboard.Key;
  private isPressed: boolean = false;
  private sizeFactor: number = 20;
  private step: number = 60;
  public isActive: boolean = false;
  public isSelected: boolean = false;
  public isCoinRound: boolean = false;
  public alreadySelected: boolean = false;

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);

    this.sizeFactor = params.sizeFactor;
    this.step = this.sizeFactor * 3;
    this.scaleX = this.sizeFactor;
    this.scaleY = this.sizeFactor;

    this.moveLeft =  this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.moveRight =  this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.moveUp =  this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.moveDown =  this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  }

  create(): void {
    this.setInteractive();
  }

  preUpdate(): void {
    this.update();
  }
   
  update(): void {
    this.showTurn();

    if (!this.isPressed) {
      if (this.isCoinRound) {
        if (!this.isActive) {
          if ((this.moveLeft.isDown || this.moveRight.isDown) && !this.alreadySelected) {
            this.isSelected = !this.isSelected;
          }
        } else {
          this.checkInputs();
        }
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
    return ( (this.moveLeft.isDown) || 
    (this.moveRight.isDown) ||
    (this.moveUp.isDown) ||
    (this.moveDown.isDown))
  }

  private checkInputs(): void {
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
    if (!this.isSelected) {
      this.tint = 0x888888;
    } else {
      this.clearTint();
    }
  }

  public activateCoinRound(selected: boolean): void {
    this.isSelected = selected;
    this.isCoinRound = true;
  }

  public setCoinActive(): void {
    this.alreadySelected = true;
    if (this.isSelected)
      this.isActive = true;
  }

  public deactivateCoinRound(): void {
    this.isActive = false;
    this.isSelected = false;
    this.isCoinRound = false;
    this.alreadySelected = false;
  }
}