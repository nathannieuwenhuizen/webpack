import 'phaser-ce';

import Atlases from '../../Data/Atlases';

export enum type {
    tile = 'tile'
}

export default class GridObject extends Phaser.Sprite
{
    protected _gridPos: {
        x: number,
        y: number
    };

    constructor(game: Phaser.Game, x: number, y: number, frame: string)
    {
        super(game, 500, 500, Atlases.Interface, frame);
        this.anchor.set(.5);

        this._gridPos = {x, y};
    }
}
