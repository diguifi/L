import { config } from '../config/preload';

export class Preloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'preloader',
            pack: {
                files: [
                    { type: 'image', key: 'bar', url: './assets/images/loadBar.png' },
                    { type: 'image', key: 'barBg', url: './assets/images/barBg.png' }
                ]
            }
        });
    }

    preload() {
        // add the loading bar to use as a display for the loading progress of the remainder of the assets
        const barBg = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'barBg');
        const bar = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'bar');

        const mask = this.make.graphics({
            x: bar.x - (bar.width / 2),
            y: bar.y - (bar.height / 2),
            add: false
        });
        mask.fillRect(0, 0, 0, bar.height);

        bar.mask = new Phaser.Display.Masks.GeometryMask(this, mask);
        
        this.load.on('progress', (progress: number) => {
            mask.clear();
            mask.fillRect(0, 0, bar.width * progress, bar.height);
        });

        this.load.image('player1', '../assets/sprites/player1.png');
        this.load.image('player2', '../assets/sprites/player2.png');
        this.load.image('coin', '../assets/sprites/coin.png');
        this.load.image('board', '../assets/sprites/board.png');
    }

    create() {
        this.scene.start('main');
    }
}