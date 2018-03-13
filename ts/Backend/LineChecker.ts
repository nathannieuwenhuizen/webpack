import 'phaser-ce';
import Tile, { _colors, _icons } from '../Objects/GridObjects/Tile';

export default class LineChecker
{
    constructor()
    {
        //
    }
    public checkPattern(tiles: Tile[]): boolean {

        let icons: _icons[] = [];
        let colors: _colors[] = [];
        for (let i: number = tiles.length; i--;) {
            icons.push(tiles[i]._icon);
            colors.push(tiles[i]._color);
        }

        if ((!this.everyValueIsTheSame(icons) && !this.everyValueIsDifferent(icons)) ||
            (!this.everyValueIsTheSame(colors) && !this.everyValueIsDifferent(colors))){
            return false;
        }

        return true;
    }
    private everyValueIsTheSame(arr: any): boolean {
        let _value: any = arr[0];

        for (let i: number = 0; i < arr.length; i++) {
           if (_value !== arr[i]){
                return false;
           }
        }
        return true;
    }
    private everyValueIsDifferent(arr: any): boolean {
        let _counts: any = [];
        for (let i: number = arr.length; i--;) {
            if (_counts[arr[i]] === undefined) {
                _counts[arr[i]] = 1;
            } else {
                return false;
            }
        }
        return true;
    }
}
