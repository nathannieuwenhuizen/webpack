import 'phaser-ce';
import Atlases from '../Data/Atlases';

export enum type {
    tile = 'tile',
}

export default class GridObject extends Phaser.Sprite 
{
    protected gridPos: {
        x: number,
        y: number
    }
    constructor(game: Phaser.Game, x: number, y: number) 
    {
        super(game, 500, 500, Atlases.Interface, 'ui_ingame_icon_grey');
        this.anchor.set(.5);

        this.gridPos = {x, y};
    }
}
