import 'phaser-ce';
import Atlases from '../Data/Atlases';

export default class TextButton extends Phaser.Button
{
    private _label: Phaser.Text;

    constructor(
        game: Phaser.Game, x: number, y: number, text: string, textStyle: Phaser.PhaserTextStyle, callback: Function, callbackContext: any) 
        {
        super(game, x, y, Atlases.Interface, callback, callbackContext, 'ui_menu_button', 'ui_menu_button', 'ui_menu_button');

        this.anchor.set(.5);

        this._label = new Phaser.Text(game, 0, 0, text, textStyle);
        this._label.anchor.set(.5);

        this.addChild(this._label);

        this.game.add.existing(this);
    }
}
