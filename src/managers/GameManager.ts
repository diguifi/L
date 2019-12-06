export class GameManager extends Phaser.GameObjects.Sprite {
  private finishKey: Phaser.Input.Keyboard.Key;
  private isPressed: boolean = false;
  private coinRound: boolean = false;
  private players: any[];
  private coins: any[];

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);
    
    this.players = params.players;
    this.coins = params.coins;
    this.finishKey =  this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  preUpdate(): void {
    this.update();
  }
   
  update(): void {
    if (!this.isPressed) {
      if (this.finishKey.isDown) {
        this.isPressed = true;

        if (!this.coinRound) {
          this.coinRound = true;

          this.players.forEach(player => {
            if (player.myTurn)
              player.activateCoin = true;
          });
        } else {
          this.coinRound = false;

          this.players.forEach(player => {
            player.myTurn = !player.myTurn;
            player.activateCoin = false;
          });
        }
      }
    } else {
      if (!this.finishKey.isDown) {
        this.isPressed = false;
      }
    }
  }
}