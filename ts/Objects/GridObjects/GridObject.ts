import 'phaser-ce';

import Atlases from '../../Data/Atlases';

export enum gridElementTypes {
    tile = 'tile'
}

export default class GridObject extends Phaser.Sprite
{
    public gridPos: {
        x: number,
        y: number
    };
    public gridElementType: gridElementTypes;

    constructor(game: Phaser.Game, x: number, y: number, frame: string, type: gridElementTypes)
    {
        super(game, 500, 500, Atlases.Interface, frame);
        this.anchor.set(.5);

        this.gridElementType = type;

        this.gridPos = {x, y};
    }
}
