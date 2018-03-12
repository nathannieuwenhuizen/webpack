import 'phaser-ce';
import GridObject from './GridObject';
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
    private color: colors;
    private icon: icons;
    private iconSprite: Phaser.Sprite;
    constructor(game: Phaser.Game, xPos: number, yPos: number, icon: icons, color: colors) 
    {
        super(game, xPos, yPos, 'ui_ingame_icon_grey');

        this.color = color;
        this.icon = icon;

        this.iconSprite = new Phaser.Sprite(game, 0, 0, Atlases.Interface, '');
        this.iconSprite.anchor.set(.5);
        this.addChild(this.iconSprite);
    }
    
    public PopOut(): void {
        //
    }
    
    public AnimateInAway(): void {
        //
    }
}
