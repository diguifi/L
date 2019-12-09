import { Player } from '../objects/Player';
import { Board } from '../objects/Board';
import { Coin } from '../objects/Coin';
import { GameManager } from '../managers/GameManager';

export class Main extends Phaser.Scene {
  private player1: any;
  private player2: any;
  private coin1: any;
  private coin2: any;
  private board: any;
  private turnText!: Phaser.GameObjects.Text;
  private sizeFactor: number = 20;
  private gameManager: any;
  
  constructor() {
    super('main');
  }

  create() {
    const step = this.sizeFactor * 3;

    this.board = this.add.existing(new Board({scene: this, x: 0, y: 0, key: 'board', sizeFactor: this.sizeFactor}).setOrigin(0, 0));
    this.player1 = this.add.existing(new Player({scene: this, x: step, y: 0, key: 'player1', sizeFactor: this.sizeFactor, myTurn: true}).setOrigin(0, 0));
    this.player2 = this.add.existing(new Player({scene: this, x: step, y: step, key: 'player2', sizeFactor: this.sizeFactor, myTurn: false}).setOrigin(0, 0));
    this.coin1 = this.add.existing(new Coin({scene: this, x: 0, y: 0, key: 'coin', sizeFactor: this.sizeFactor, myTurn: false}).setOrigin(0, 0));
    this.coin2 = this.add.existing(new Coin({scene: this, x: step * 3, y: step * 3, key: 'coin', sizeFactor: this.sizeFactor, myTurn: false}).setOrigin(0, 0));

    this.gameManager = this.add.existing(new GameManager({scene: this, x: -15, y: -15, key: '', players: [this.player1, this.player2], coins: [this.coin1, this.coin2], board: this.board}));

    this.turnText = this.add.text(
      60,300,
      `Turn: ${this.getTurn()}`,
      {
        fontFamily: "Connection",
        fontSize: 20
      }
    );

    this.player1.on("overlapstart", function() {
      console.log('oveoveoev')
    });
  }

  preUpdate(): void {
    this.update();
  }

  update(): void {
    this.turnText.setText(`Turn: ${this.getTurn()}`);
  }

  getTurn(): string {
    return this.player1.myTurn ? 'Player 1' : 'Player 2';
  }
}