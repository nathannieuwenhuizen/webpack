import Grid from '../Grid';

import LevelGenerator from '../LevelGenerator';
import PathChecker from '../../Backend/PathChecker';
import Input from '../Input';

import Tile, {TileShapes, TileIcons} from '../GridObjects/Tile';

export default class GameField extends Phaser.Group
{
    public grid: Grid;

    private _gridSpawner: LevelGenerator;
    private _pathChecker: PathChecker;
    private _gridInput: Input;
    // private _lineDrawer: LineDrawer

    /* The path that is being drawn */
    private _currentPath: Tile[];

    constructor(game: Phaser.Game)
    {
        super(game);

        this.grid = new Grid(this.game, 6, 6, 90, .9);
        this.addChild(this.grid);

        this._gridSpawner = new LevelGenerator();
        this._pathChecker = new PathChecker();

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

        this._gridInput.onDragSnap.add(this.addNewTile, this);
        this._gridInput.onInputUp.add(this.canclePath, this);

        this.resize();
    }

    /* What happens if the input finds, the mouse is draggig over a new tile */
    private addNewTile(tile: Tile): void
    {
        this._currentPath.push(tile);

        if (this._pathChecker.isPatternPossible(this._currentPath) === false)
        {
            this._currentPath.pop();
            return;
        }

        this.newPathCreated(this._currentPath);
    }

    /* What happened when the path creaton get's canceled */
    private canclePath(): void
    {
        this._currentPath = [];
    }

    /* What happends when a new path is created */
    private newPathCreated(path: Tile[]): void
    {
        console.log(path);
    }

    public update(): void
    {
        this._gridInput.checkInputOnTiles(<Tile[]>this.grid.elements);
    }

    public resize(): void
    {
        let vmin: number = Math.min(this.game.width, this.game.height);

        let gridSizeMultiplier: number = vmin * .7;
        this.grid.gridBlockSize = gridSizeMultiplier / this.grid.blocksOnX;

        this.grid.position.set(
            this.game.width / 2 - this.grid.width / 2,
            this.game.height / 1.6 - this.grid.height / 2
        );
    }

    public destroy(): void
    {
        if (this.grid !== null)
        {
        this.grid.destroy();
        this.grid = null;

        this._gridSpawner = null;

        this._pathChecker = null;

        this._gridInput.destroy();
        this._gridInput = null;
        }
    }

}
