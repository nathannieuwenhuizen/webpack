import 'phaser-ce';

import GridObject from './GridObject';
import {gridElementTypes} from './GridObject';
import Atlases from '../../Data/Atlases';

export enum icons {
    stripe = 'stripe',
    circle = 'circle',
    square = 'square'
}

export enum colors {
    blue = 'blue',
    red = 'red',
    green = 'green'
}

export default class Tile extends GridObject
{
    private _color: colors;
    private _icon: icons;
    private _iconSprite: Phaser.Sprite;

    constructor(game: Phaser.Game, xPos: number, yPos: number, icon: icons, color: colors)
    {
        super(game, xPos, yPos, 'ui_ingame_icon_grey', gridElementTypes.tile);

        this._color = color;
        this._icon = icon;

        this._iconSprite = new Phaser.Sprite(game, 0, 0, Atlases.Interface, '');
        this._iconSprite.anchor.set(.5);

        this.addChild(this._iconSprite);
    }

    public PopOut(): void {
        //
    }

    public AnimateInAway(): void {
        //
    }
}
