import 'phaser-ce';

import GridObject from './GridObject';
import Atlases from '../../Data/Atlases';

export enum _icons {
    triangle = 'triangle',
    circle = 'circle',
    square = 'square'
}

export enum _colors {
    blue = 'blue',
    red = 'red',
    green = 'green'
}

export default class Tile extends GridObject
{
    private _color: _colors;
    private _icon: _icons;
    private _iconSprite: Phaser.Sprite;
    constructor(game: Phaser.Game, _xPos: number, _yPos: number)
    {
        super(game, _xPos, _yPos, 'ui_ingame_icon_backdrop');

        this.assignVallues();

        this._iconSprite = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'ui_ingame_icon_' + this._icon);
        this._iconSprite.anchor.set(.5);
        switch (this._color) {
            case _colors.blue:
            this._iconSprite.tint = 0x0000FF;
            break;
            case _colors.red:
            this._iconSprite.tint = 0x0000FF;
            break;
            case _colors.green:
            this._iconSprite.tint = 0x008000;
            break;
            default:
            break;
        }
        this.addChild(this._iconSprite);
    }

    public assignVallues(): void {
        let random: number = Math.floor(Math.random() * 3);
        switch (random){
            case 0:
            this._icon = _icons.circle;
            break;
            case 1:
            this._icon = _icons.triangle;
            break;
            case 2:
            this._icon = _icons.square;
            break;
            default:
            this._icon = _icons.square;
            break;
        }
        random = Math.floor(Math.random() * 3);
        switch (random){
            case 0:
            this._color = _colors.blue;
            break;
            case 1:
            this._color = _colors.red;
            break;
            case 2:
            this._color = _colors.green;
            break;
            default:
            this._color = _colors.blue;
            break;
        }
    }

    public popOut(): void {
        //
    }

    public animateInAway(): void {
        //
    }
}
