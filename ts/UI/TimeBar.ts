import 'phaser-ce';

import Images from '../Data/Images';
export default class TimeBar extends Phaser.Sprite
{

    private _timeBar: Phaser.Sprite;
    private _maxWidth: number;
    private _maxHeight: number;

    constructor(game: Phaser.Game, x:number, y:number, maxWidth?:number, maxHeight?:number)
    {
        super(game,0,0);
        //this._maxWidth = maxWidth;
        //this._maxHeight = maxHeight;
        this.game.add.existing(this);

        this.addSprite();
    }

    
    public addSprite(): void
    {
   
        this._timeBar = this.game.add.sprite(this.game.width / 2, this.game.height / 2, Images.PlaceholderBar); 
    }

    public shutdown(): void 
    {
      
        this._timeBar.destroy(true);
        this._timeBar = null;
    }

}