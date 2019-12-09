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
            player.activateCoinRound();
          });

          let i = 0;
          this.coins.forEach(coin => {
            coin.activateCoinRound(i == 0);
            i++;
          });
        } else if (!this.anyCoinActivated()) {
          this.coins.forEach(coin => {
            coin.setCoinActive();
          });
        } else {
          this.coinRound = false;
          this.coins.forEach(coin => {
            coin.deactivateCoinRound();
          });

          this.players.forEach(player => {
            player.deactivateCoinRound();
          });
        }
      }
    } else {
      if (!this.finishKey.isDown) {
        this.isPressed = false;
      }
    }
  }

  private anyCoinActivated(): boolean {
    let anyActive = false;
    this.coins.forEach(coin => {
      if (coin.isActive)
        anyActive = true;
    });

    return anyActive;
  }
}