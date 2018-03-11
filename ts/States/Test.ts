import 'phaser-ce';

import Images from '../Data/Images';
export default class Test extends Phaser.State 
{
    public static Name: string = 'test';

    public name: string = Test.Name;

    private _testSprite: Phaser.Sprite;

    constructor() 
    {
        super();
    }

    public init(): void 
    {
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
