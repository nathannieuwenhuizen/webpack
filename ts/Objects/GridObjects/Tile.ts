import 'phaser-ce';

import GridObject from './GridObject';
import {gridElementTypes} from './GridObject';
import Atlases from '../../Data/Atlases';

export enum TileIcons
{
    triangle = 'triangle',
    circle = 'circle',
    square = 'square'
}

export enum TileShapes
{
    blue = 0x0000ff,
    red = 0xff0000,
    green = 0x008000
}

export default class Tile extends GridObject
{
    private _shape: TileShapes;
    private _icon: TileIcons;

    private _iconSprite: Phaser.Sprite;

    private _tween: Phaser.Tween;

    constructor(game: Phaser.Game, gridX: number, gridY: number, shape: TileShapes, icon: TileIcons)
    {
        super(game, gridX, gridY, 'ui_ingame_icon_backdrop', gridElementTypes.tile);

        this._iconSprite = new Phaser.Sprite(game, 0, 0, Atlases.Interface, '');
        this._iconSprite.anchor.set(.5);

        this.shape = shape;
        this.icon = icon;

        this.addChild(this._iconSprite);
    }

    /* Set the shape of a tile */
    set shape(value: TileShapes)
    {
        this._iconSprite.tint = value;
        this._shape = value;
    }
    get shape(): TileShapes
    {
        return this._shape;
    }

    /* Set the icon of a tile */
    set icon(value: TileIcons)
    {
        this._iconSprite.frameName = 'ui_ingame_icon_' + value;
        this._icon = value;
    }
    get icon(): TileIcons
    {
        return this._icon;
    }

    public animateOut(): Phaser.Signal {

        this.clearTween();

        this._tween = this.game.add.tween(this.scale)
            .to({x: 0, y: 0}, 300, Phaser.Easing.Cubic.InOut)
            .start();

        return this._tween.onComplete;
    }

    public animateDown(tiles: number, newYPos: number): Phaser.Signal
    {

        this.clearTween();

        this._tween = this.game.add.tween(this)
            .to({y: newYPos}, 650, Phaser.Easing.Bounce.Out)
            .start();

        this.gridPos.y += tiles;

        return this._tween.onComplete;
    }

    private clearTween(): void
    {
        if (this._tween)
        {
            this._tween.stop(false);
            this._tween = null;
        }
    }

    public destroy(): void {
        super.destroy(true);

        this._iconSprite.destroy(true);
        this._iconSprite = null;
    }
}
