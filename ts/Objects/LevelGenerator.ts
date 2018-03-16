import GameTile, {TileShapes, TileIcons} from './GridObjects/GameTile';
import Grid from './Grid';

export default class LevelGenerator
{
    /* Returns a tile array with nice generated values */
    public generateGrid(grid: Grid, createTile: (gridX: number, gridY: number, shape?: TileShapes, icon?: TileIcons) => GameTile): GameTile[]
    {
        let resultArray: GameTile[] = [];

        /* Looping trough all the grid blocks */
        for (let x: number = grid.blocksOnX; x--; )
        {
            for (let y: number = grid.blocksOnY; y--; )
            {

                /* Adding the new tiles */
                resultArray.push( createTile(
                    x,
                    y,
                    this.getRandomShape(),
                    this.getRandomIcon()
                ));

            }
        }

        return resultArray;
    }

    /* Generate a random shape from the TileShapes enum */
    private getRandomShape(): TileShapes
    {
        let randomValue: number = Math.random();

        return randomValue < .333 ? TileShapes.blue : randomValue < .666 ? TileShapes.green : TileShapes.red;
    }

    /* Generate a random icon from the TileIcons enum */
    private getRandomIcon(): TileIcons
    {
        let randomValue: number = Math.random();

        return randomValue < .333 ? TileIcons.circle : randomValue < .666 ? TileIcons.square : TileIcons.triangle;
    }

}
