import Grid from '../Grid';

import LevelGenerator from '../LevelGenerator';
import PathChecker from '../../Backend/PathChecker';
import LineDrawer from '../LineDrawer';
import Input from '../Input';

import GridRegenerator from '../GridRegenerator';

import Tile, {TileShapes, TileIcons} from '../GridObjects/Tile';
import Atlases from '../../Data/Atlases';
import { gridElementTypes } from '../GridObjects/GridObject';

export default class GameField extends Phaser.Group
{
    public grid: Grid;

    private _gridSpawner: LevelGenerator;
    private _pathChecker: PathChecker;
    private _gridInput: Input;
    private _lineDrawer: LineDrawer;
    private _gridRegenerator: GridRegenerator;

    /* The path that is being drawn */
    private _currentPath: Tile[];

    private _backdropSprite: Phaser.Sprite;
    private _timerBbackdropSprite: Phaser.Sprite;
    constructor(game: Phaser.Game)
    {
        super(game);

        this._backdropSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Interface, 'ui_ingame_playfield_backdrop');
        this.addChild(this._backdropSprite);
        this._backdropSprite.anchor.set(.5);

        this._timerBbackdropSprite = new Phaser.Sprite(this.game, 0, -this._backdropSprite.height / 2, Atlases.Interface, 'ui_ingame_timer_backdrop');
        this._timerBbackdropSprite.anchor.set(.5, 0);

        this._backdropSprite.addChild(this._timerBbackdropSprite);

        this.grid = new Grid(this.game, 6, 6, 90, .9);
        this.addChild(this.grid);

        this._gridSpawner = new LevelGenerator();
        this._pathChecker = new PathChecker();
        this._lineDrawer = new LineDrawer(game);

        this._gridRegenerator = new GridRegenerator();

        this._gridInput = new Input(this.game);

        this._currentPath = [];

        this.setupGrid();

    }

    /* The initial setup for the grid */
    private setupGrid(): void
    {
        /* Generating the grid */
        let generatedLevel: Tile[] = this._gridSpawner.generateGrid(this.grid, (gridX: number, gridY: number, shape: TileShapes, icon: TileIcons) => {

            return new Tile(this.game, gridX, gridY, shape, icon);

        });

        /* Adding the generated grid to the actual grid */
        generatedLevel.forEach((tile: Tile) => {
            this.grid.add(tile);
        });

        /* Asigning the input signals */
        this._gridInput.onDragSnap.add(this.addNewTileToPath, this);
        this._gridInput.onInputUp.add(this.inputRelease, this);

        this.resize();
    }

    /* What happens if the input finds, the mouse is draggig over a new tile */
    private addNewTileToPath(tile: Tile): void
    {
        /* Checking if the tile is already in the path */
        for (let i: number = this._currentPath.length; i--; )
        {
            if (tile === this._currentPath[i])
            {

                /* Removing all the tiles after the current tile */
                for (let y: number = i + 1; y <= this._currentPath.length; y++)
                {
                    this._currentPath.splice(y, 1);
                }

                this.newPathCreated(this._currentPath);
                return;
            }
        }

        this._currentPath.push(tile);

        /* Checking if the patern is possible */
        if (
            this._currentPath.length > 1 &&
            (this._pathChecker.isPatternPossible(this._currentPath) === false ||
            this._pathChecker.isNeighbour(this._currentPath[this._currentPath.length - 2], tile) === false)
        ) {
            this._currentPath.pop();
            return;
        }

        /* A new path is created */
        this.newPathCreated(this._currentPath);
    }

    /* What happens when the path input is released */
    private inputRelease(): void
    {

        this._lineDrawer.clearPath();

        if (this._currentPath.length < 3)
        {
            this.cancelPath();
            return;
        }

        /* Animating out the tiles in the grid */
        this._currentPath[0].animateOut().addOnce(this.regenerateGrid, this);

        for (let i: number = this._currentPath.length - 1; i > 0; i-- )
        {
            this._currentPath[i].animateOut();
        }

    }

    /* Replanish the grid with new tiles */
    private regenerateGrid(): void
    {
        for (let i: number = this._currentPath.length; i--; )
        {
            this.grid.destroyElement(this._currentPath[i]);
        }

        this._gridRegenerator.moveNeededBlocksDown(this.grid);

        this.cancelPath();
    }

    /* What happens when the path creaton get's canceled */
    private cancelPath(): void
    {
        this._currentPath = [];
        this._lineDrawer.clearPath();
    }

    /* What happends when a new path is created */
    private newPathCreated(path: Tile[]): void
    {
        this._lineDrawer.drawPath(path, 15, 0x00ff00);
    }

    public update(): void
    {
        this._gridInput.checkInputOnTiles(<Tile[]>this.grid.get(null, null, null, gridElementTypes.tile));
    }

    public resize(): void
    {
        let vmin: number = Math.min(this.game.width, this.game.height);

        let gridSizeMultiplier: number = vmin * 0.88;
        this.grid.gridBlockSize = gridSizeMultiplier / this.grid.blocksOnX;

        this.grid.position.set(
            this.game.width / 2 - this.grid.width / 2,
            0
        );

        this._backdropSprite.position.set(this.game.width / 2, this.grid.y + this.grid.height / 2 - 10);
        this._backdropSprite.scale.set(vmin / 720);
        this.y = this.game.height - this.height;
    }

    public destroy(): void
    {
        if (this.grid)
        {
            this.grid.destroy();
        }
        this.grid = null;

        this._gridSpawner = null;

        this._pathChecker = null;

        if (this._gridInput)
        {
            this._gridInput.destroy();
        }
        this._gridInput = null;
        if (this._lineDrawer)
        {
            this._lineDrawer.destroy();
        }
        this._lineDrawer = null;
    }

}
