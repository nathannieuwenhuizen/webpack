import 'phaser-ce';

import Images from '../Data/Images';
import Spines from '../Data/Spines';

import Grid from '../Objects/Grid';
import Tile, { TileShapes, TileIcons } from '../Objects/GridObjects/Tile';
import LevelGenerator from '../Objects/LevelGenerator';
import Input from '../Objects/Input';

import TextButton from '../UI/TextButton';
import PauseMenu from '../UI/PauseMenu';
import Timer from '../BackEnd/Timer';
import TimeBar from '../UI/TimeBar';

export default class Gameplay extends Phaser.State
{
    public static Name: string = 'gameplay';

    public name: string = Gameplay.Name;

    private _testSprite: Phaser.Sprite;
    private _timeBar: TimeBar;
    private _timerClass: Timer;

    private _testGrid: Grid;
    private _levelGenerator: LevelGenerator;

    private _input: Input;

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

        /* Creating the grid */
        this._testGrid = new Grid(this.game, 6, 6, 90, .9);
        this.game.add.existing(this._testGrid);

        /* Creating the generator and creating a new grid */
        this._levelGenerator = new LevelGenerator();
        let generatedGrid: Tile[] = this._levelGenerator.generateGrid(this._testGrid, (gridX: number, gridY: number, shape: TileShapes, icon: TileIcons) => {

            return new Tile(this.game, gridX, gridY, shape, icon);

        });

        /* Adding the generated grid to the grid */
        generatedGrid.forEach((tile: Tile) => {
            this._testGrid.add(tile);
        });

        this._input = new Input(this.game);
        this._input.onDragSnap.add((tile: Tile) => {
            console.log('snapping and dragging', tile.gridPos);
        });
        this._input.onInputUp.add(() => {
            console.log('cancle path');
        });

        this._pauseMenu = new PauseMenu(this.game, 100, 100, 100, Images.CaviaTest , Images.CaviaTest );
        this._pauseMenu.onContinue.add(this.disableMenu, this);
        this.pauseMenuButton = new TextButton(this.game, 100, 100, '||', {font: '50px',
        fill: '#fff', align: 'center'}, this.activateMenu, this );

        this.resize();
    }

    public update(): void
    {
        this._input.checkInputOnTiles(<Tile[]>this._testGrid.elements);
    }

    public shutdown(): void
    {
        super.shutdown(this.game);

        this._testGrid.destroy();
        this._testGrid = null;

        this._levelGenerator = null;
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
