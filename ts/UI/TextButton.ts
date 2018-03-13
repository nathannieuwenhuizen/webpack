import 'phaser-ce';

export default class TextButton extends Phaser.Button
{
    private _label: Phaser.Text;
    private _maxWidth: number;
    private _maxHeight: number;

    constructor(
        game: Phaser.Game, x: number, y: number, text: string, textStyle: Phaser.PhaserTextStyle, callback: Function, callbackContext: any, maxWidth?: number, maxHeight?: number, bgColor?: number
    ) {
        super(game, x, y, '', callback, callbackContext);

        this._maxHeight = maxHeight;
        this._maxWidth = maxWidth;

        this.anchor.set(.5);

        this._label = new Phaser.Text(game, 0, 0, text, textStyle);
        this._label.anchor.set(.5);

        this.addChild(this._label);

        this.game.add.existing(this);
        this.createTexture(bgColor);
    }

    /*hallo*/
    public createTexture(bgColor: number): void {

        //Create a texture with shadow and use it as the texture of the button.
        let graphics: Phaser.Graphics = this.game.make.graphics(0, 0);

        graphics.beginFill(0x000000, 0.3)
            .drawRoundedRect(5, 5 , this._maxWidth - 10 , this._maxHeight, 15)
            .beginFill(bgColor)
            .drawRoundedRect(0, 0, this._maxWidth, this._maxHeight, 15)
            .lineStyle(3, 0xffffff)
            .drawRoundedRect(0, 0, this._maxWidth - 2, this._maxHeight - 2, 15)
            .endFill();

        this.texture = graphics.generateTexture();

        graphics.destroy(true);
    }
}
