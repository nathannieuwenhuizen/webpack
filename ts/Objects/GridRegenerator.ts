import Tile from './GridObjects/Tile';
import Grid from './Grid';
import GridObject from './GridObjects/GridObject';

export interface IRegenerateGridInfo
{
    object: GridObject;
    spacesUnderneath: number;
}

export default class GridRegenerator
{

    /* Gives an interface wich all the tiles that have spece beneath them */
    private getFloatingTiles(grid: Grid): GridObject[]
    {
        let elementsWithSpaceUnderneath: GridObject[] = [];

        /* Looping through the grid elements */
        grid.forEach((element: GridObject, gridX: number, gridY: number) => {

            if (
                grid.get(null, gridX, gridY + 1) === null &&
                gridY !== grid.blocksOnY - 1
            ) {
                elementsWithSpaceUnderneath.push(element);
            }

            return false;
        });

        return elementsWithSpaceUnderneath;
    }

    /* Animates down the tiles that have no block beneath them. Returns if any new tiles are moved down */
    public moveNeededBlocksDown(grid: Grid, ranCicles: number = 0): void
    {

        let floatingTiles: GridObject[] = this.getFloatingTiles(grid);

        for (let i: number = floatingTiles.length; i--; )
        {
            let currentTile: GridObject = floatingTiles[i];
            (<Tile>currentTile).animateDown(
                1,
                grid.gridPositionToWorldPosition(
                    currentTile,
                    currentTile.gridPos.x,
                    currentTile.gridPos.y + 1
                ).y
            );

        }

        ranCicles += 1;

        if (ranCicles > grid.blocksOnY) { console.error('Grid blocks moving down buffer overflow: ', ranCicles); return; }

        if (floatingTiles.length > 0) { this.moveNeededBlocksDown(grid, ranCicles); }

    }

}
