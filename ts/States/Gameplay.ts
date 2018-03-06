import 'phaser-ce';

import Images from '../Data/Images';

export default class Gameplay extends Phaser.State {
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
        this.game.load.image(Images.IconTest, './assets/sprites/' + Images.IconTest);

    }

    public create(): void
    {
        super.create(this.game);

        this._testSprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, Images.IconTest);
        this._testSprite.anchor.set(.5);


    }

    public shutdown(): void 
    {
        super.shutdown(this.game);

        this._testSprite.destroy(true);
        this._testSprite = null;
    }

}