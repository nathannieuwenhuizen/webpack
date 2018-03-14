import 'phaser-ce';
import Atlases from '../Data/Atlases';

export default class ImageButton extends Phaser.Button
{
    private _image: Phaser.Sprite;

    constructor(
        game: Phaser.Game, x: number, y: number, key: string, callback: Function, callbackContext: any)
        {
        super(game, x, y, Atlases.Interface, callback, callbackContext, 'ui_ingame_button', 'ui_ingame_button', 'ui_ingame_button');

        this.anchor.set(.5);

        this._image = new Phaser.Sprite(game, 0, 0, Atlases.Interface, key);
        this._image.anchor.set(.5);

        this.addChild(this._image);

        this.onInputDown.add(() => {
            this.scale.set(0.9);
        });
        this.onInputOut.add(() => {
            this.scale.set(1);
        });
        this.onInputUp.add(() => {
            this.scale.set(1);
        });
    }
}
