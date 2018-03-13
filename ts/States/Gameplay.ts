import 'phaser-ce';

import Images from '../Data/Images';
import Spines from '../Data/Spines';

import Grid from '../Objects/Grid';
import Tile from '../Objects/GridObjects/Tile';

export default class Gameplay extends Phaser.State
{
    public static Name: string = 'gameplay';

    public name: string = Gameplay.Name;

    private _testSprite: Phaser.Sprite;
    private _testGrid: Grid;

    constructor()
    {
        super();
    }

    public resize(): void {
        let vmin: number = Math.min(this.game.width, this.game.height);

        let gridSizeMultiplier: number = vmin * .7;
        this._testGrid.gridBlockSize = gridSizeMultiplier / this._testGrid.blocksOnX;

        this._testGrid.position.set(
            this.game.width / 2 - this._testGrid.width / 2,
            this.game.height / 1.6 - this._testGrid.height / 2
        );

    }

    public create(): void
    {
        super.create(this.game);

        let text: Phaser.Text = this.game.add.text(0, 0, 'this is the gameplay state', {
            font: '50px',
            fill: '#fff',
            align: 'center'
        });

        this._testGrid = new Grid(this.game, 6, 6, 90, .9);

        this.game.add.existing(this._testGrid);

        for (let x: number = 7; x--; )
        {
            for (let y: number = 7; y--; )
            {
                this._testGrid.add(new Tile(this.game, x, y));
            }
        }

        this.resize();
    }

    public shutdown(): void
    {
        super.shutdown(this.game);
    }

}
