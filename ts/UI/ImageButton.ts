import 'phaser-ce';
import Atlases from '../Data/Atlases';

export default class ImageButton extends Phaser.Button
{
    private _image: Phaser.Sprite;

    constructor(
        game: Phaser.Game, x: number, y: number, key: string, callback: Function, callbackContext: any)
        {
        super(game, x, y, Atlases.Interface, callback, callbackContext, 'ui_menu_button_small', 'ui_menu_button_small', 'ui_menu_button_small');

        this.anchor.set(.5);

        this._image = new Phaser.Sprite(game, 0, 0, Atlases.Interface, key);
        this._image.anchor.set(.5);

        this.addChild(this._image);

    }
}
