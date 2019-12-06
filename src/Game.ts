import 'phaser';
import { Preloader } from './scenes/Preloader';
import { Main } from './scenes/Main';
    
const config = {
    title: 'L',
    type: Phaser.WEBGL,
    parent: 'game',
    width: 960,
    height: 540,
    pixelArt: true,
    scene: [
        Preloader,
        Main
    ],
};

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
      super(config);      
    }
}

window.onload = () => {
    var game = new Game(config);      
};