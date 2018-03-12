import 'phaser-ce';
import GridObject from './GridObject';
import Atlases from '../../Data/Atlases';

export enum icons {
    triangle = 'triangle',
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
    constructor(game: Phaser.Game, xPos: number, yPos: number)
    {
        super(game, xPos, yPos, 'ui_ingame_icon_backdrop');

        this.assignVallues();

        console.log(this.color, this.icon);
        this.iconSprite = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'ui_ingame_icon_' + this.icon);
        this.iconSprite.anchor.set(.5);
        switch (this.color) {
            case colors.blue:
            this.iconSprite.tint = 0x0000FF;
            break;
            case colors.red:
            this.iconSprite.tint = 0x0000FF;
            break;
            case colors.green:
            this.iconSprite.tint = 0x008000;
            break;
            default:
            break;
        }
        this.addChild(this.iconSprite);
    }

    public assignVallues(): void {
        let random: number = Math.floor(Math.random() * 3);
        switch (random){
            case 0:
            this.icon = icons.circle;
            break;
            case 1:
            this.icon = icons.triangle;
            break;
            case 2:
            this.icon = icons.square;
            break;
            default:
            this.icon = icons.square;
            break;
        }
        random = Math.floor(Math.random() * 3);
        switch (random){
            case 0:
            this.color = colors.blue;
            break;
            case 1:
            this.color = colors.red;
            break;
            case 2:
            this.color = colors.green;
            break;
            default:
            this.color = colors.blue;
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
