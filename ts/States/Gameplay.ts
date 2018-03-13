import 'phaser-ce';

import Images from '../Data/Images';
import Spines from '../Data/Spines';

import Grid from '../Objects/Grid';
import Tile from '../Objects/GridObjects/Tile';

import TextButton from '../UI/TextButton';
import PauseMenu from '../UI/PauseMenu';
import Timer from '../BackEnd/Timer';
import TimeBar from '../UI/TimeBar';

export default class Gameplay extends Phaser.State
{
    public static Name: string = 'gameplay';

    public name: string = Gameplay.Name;

    private _testSprite: Phaser.Sprite;
    private _testGrid: Grid;
    private _timeBar: TimeBar;
    private _timerClass: Timer;

    private pauseMenuButton: TextButton;

    private _pauseMenu: PauseMenu;

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

        this._pauseMenu.resize();
    }

    public pause(paused: boolean): void
    {
        this.game.paused = paused;
    }

    public create(): void
    {
        super.create(this.game);

        this._timerClass = new Timer();
        this._timeBar = new TimeBar(this.game, 0, 0);

        this.game.add.text(0, 0, 'this is the gameplay state', {
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

        this._pauseMenu = new PauseMenu(this.game, 100, 100, 100, Images.CaviaTest , Images.CaviaTest );
        this._pauseMenu.onContinue.add(this.disableMenu, this);
        this.pauseMenuButton = new TextButton(this.game, 100, 100, '||', {font: '50px',
        fill: '#fff', align: 'center'}, this.activateMenu, this );

        this.resize();
    }

    public shutdown(): void
    {
        super.shutdown(this.game);
    }

    private activateMenu(): void
    {
        //pause the game
        //stop the timer from moving et cetera
        this.pause(true);
        this._pauseMenu.visible = true;

    }

    private disableMenu(): void
    {
        this.pause(false);
    }

}
