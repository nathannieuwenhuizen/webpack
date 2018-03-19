import 'phaser-ce';

import Images from '../Data/Images';
import Timer from '../BackEnd/Timer';

export default class TimeBar extends Phaser.Group
{

    private _timeBar: Phaser.Sprite;
    //private _maxWidth: number;
    //private _maxHeight: number;

<<<<<<< HEAD
    private _timeMask: Phaser.Graphics;
    private _maskWidth: number; 

    get GetMaskWidth():number
    {
        return this._maskWidth;
    }
    
    set SetMaskWidth(newMaskWidth:number)
    {
        this._maskWidth = newMaskWidth;
    }

    private _timerClass: Timer;
   // private _currentTimeScale:number;

    public mask: any;

    constructor(game: Phaser.Game, x?:number, y?:number, maxWidth?:number, maxHeight?:number)
    {
        super(game);
        this._maxWidth = maxWidth;
        this._maxHeight = maxHeight;
=======
    constructor(game: Phaser.Game/*, x: number, y: number, maxWidth?: number, maxHeight?: number*/)
    {
        super(game, 0, 0);
        //this._maxWidth = maxWidth;
        //this._maxHeight = maxHeight;
>>>>>>> a30b436599de9482a387a1900de60fc07f9dc3f2
        this.game.add.existing(this);
        
        

        this.addSprite();
        this.addMask();
        this.scaleSprite();

        this._timerClass = new Timer();
    }

    public addSprite(): void
    {
<<<<<<< HEAD
        this._timeBar = this.game.add.sprite(this.game.width / 125, this.game.height / 2, Images.PlaceholderBar); 
    }

  
    public addMask(): void
    {
        
        this._timeMask = this.game.add.graphics(150, this._timeBar.y / 2);
        this._timeMask.beginFill(0x00000f);
    }

    /*
    * This function will get called with every interval
    * Might need a cleaner solution
    */

    public drawMask(adjustedWidth:number): void
    {
        // Needs a cleaner solution due to constant drawing
        this._timeMask.drawRect(580, 320, this._timeBar.width * adjustedWidth, this._timeBar.height);
    }
  
    public scaleSprite():void
    {
        this._timeBar.scale.setTo(2.5,2.5);
    }



=======

        this._timeBar = this.game.add.sprite(this.game.width / 2, this.game.height / 2, Images.PlaceholderBar);
    }

>>>>>>> a30b436599de9482a387a1900de60fc07f9dc3f2
    public shutdown(): void
    {
        this._timeBar.destroy(true);
        this._timeBar = null;

        this._timeMask.destroy(true);
        this._timeMask = null;
    }

}
