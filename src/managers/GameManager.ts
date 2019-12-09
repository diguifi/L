export class GameManager extends Phaser.GameObjects.Sprite {
  private finishKey: Phaser.Input.Keyboard.Key;
  private isPressed: boolean = false;
  private coinRound: boolean = false;
  private players: any[];
  private coins: any[];
  private board: any;
  public body!: Phaser.Physics.Arcade.Body;

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);

    this.scene.physics.world.enable(this);
    
    this.players = params.players;
    this.coins = params.coins;
    this.board = params.board;
    this.finishKey =  this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  preUpdate(): void {
    this.update();
  }
   
  update(): void {
    console.log(this.validMove());

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

  private validMove(): boolean {
    return this.onBoard() && this.notOverlapingThemselves();
  }

  private onBoard(): boolean {
    const player1OnBoard = this.scene.physics.overlap(this.board, this.players[0]);
    const player2OnBoard = this.scene.physics.overlap(this.board, this.players[1]);
    const coin1OnBoard = this.scene.physics.overlap(this.board, this.coins[0]);
    const coin2OnBoard = this.scene.physics.overlap(this.board, this.players[1]);

    return player1OnBoard && player2OnBoard && coin1OnBoard && coin2OnBoard;
  }

  private notOverlapingThemselves(): boolean {
    const player1OnPlayer2 = this.scene.physics.overlap(this.players[0], this.players[1]);
    const coin1OnCoin2 = this.scene.physics.overlap(this.coins[0], this.coins[1]);
    const playersOnCoins = this.scene.physics.overlap(this.players, this.coins);

    return !player1OnPlayer2 && !coin1OnCoin2 && !playersOnCoins;
  }
}