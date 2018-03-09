import 'phaser-ce';

import Images from '../Data/Images';
import Spines from '../Data/Spines';
export default class Gameplay extends Phaser.State 
{
    public static Name: string = 'gameplay';

    public name: string = Gameplay.Name;

    private _testSprite: Phaser.Sprite;

    constructor() 
    {
        super();
    }

    public preload(): void
    {
        super.preload(this.game);

        // This will be replaced with a propper preloader
        this.game.load.image(Images.IconTest, './assets/sprites/' + Images.IconTest + '.png');

        this.game.load.spine('chips', 'assets/spine/chips.json');
    }

    public create(): void
    {
        super.create(this.game);

        this._testSprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, Images.IconTest);
        this._testSprite.anchor.set(.5);

        let chip: any = this.game.add.spine(
            200,        //X positon
            200,        //Y position
            'chips'     //the key of the object in cache
        ); 
        chip.setAnimationByName(
            0,          //Track index
            "idle",     //Animation's name
            true        //If the animation should loop or not
        );
        chip.setSkinByName('chip_blue');
    }

    public shutdown(): void 
    {
        super.shutdown(this.game);

        this._testSprite.destroy(true);
        this._testSprite = null;
    }

}