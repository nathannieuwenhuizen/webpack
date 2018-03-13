import 'phaser-ce';
import Tile, { TileIcons, TileShapes } from '../Objects/GridObjects/Tile';

export default class LineChecker
{

    /* Return if a patern is possible */
    public isPatternPossible(tiles: Tile[]): boolean
    {
        let icons: TileIcons[] = [];
        let shapes: TileShapes[] = [];

        for (let i: number = tiles.length; i--; )
        {
            icons.push(tiles[i].icon);
            shapes.push(tiles[i].shape);
        }

        /* If a path is all opposite or all the same, return true */
        let isCorrect: boolean =
                !((!this.everyValueIsTheSame(icons) && !this.everyValueIsDifferent(icons)) ||
                (!this.everyValueIsTheSame(shapes) && !this.everyValueIsDifferent(shapes)));

        return isCorrect;
    }

    /* Returns true if every value is the same */
    private everyValueIsTheSame(arr: any): boolean
    {
        let _value: any = arr[0];

        for (let i: number = 0; i < arr.length; i++)
        {
            if (_value !== arr[i])
            {
                return false;
            }
        }

        return true;
    }

    /* Returns true if every value is different */
    private everyValueIsDifferent(arr: any): boolean {
        let _counts: any = [];

        for (let i: number = arr.length; i--; )
        {
            if (_counts[arr[i]] === undefined)
            {
                _counts[arr[i]] = 1;
            }
            else
            {
                return false;
            }
        }

        return true;
    }
}
