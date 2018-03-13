import 'phaser-ce';
import TextButton from './TextButton';
import { Image } from 'phaser-ce';
import Menu from '../States/Menu';

export default class PauseMenu extends Phaser.Group
{
    private _continueGameButton:TextButton;
    private _backToMenuButton:TextButton;

    private _menuBackground: Phaser.Image;
    public onContinue: Phaser.Signal;

    constructor(game: Phaser.Game, x: number, y: number, spaceBetweenButtons: number, backgroundImage: string,buttonBackground: string)
    {
        super(game);
        this._menuBackground = new Phaser.Image(game,0,0,backgroundImage);
        this._menuBackground.anchor.set(0.5);
        this.addChild(this._menuBackground);

        this._continueGameButton = new TextButton(game,0,spaceBetweenButtons,"Continue",{font: '50px',
        fill: '#fff',
        align: 'center' },this.continue,this)
        this._menuBackground.anchor.set(0.5);
        this.addChild(this._continueGameButton);

        this._backToMenuButton = new TextButton(game,0,spaceBetweenButtons*2,"Back To Menu",{font: '50px',
        fill: '#fff',
        align: 'center' },this.backToMenu,this)
        this._menuBackground.anchor.set(0.5);
        this.addChild(this._backToMenuButton);
        
        this.visible = false;
        this.onContinue = new Phaser.Signal();
    }

    public resize(): void
    {
        this.x = this.game.width/2;
        this.y = this.game.height/2;
    }

    private continue(): void
    {
        this.visible = false;
        this.onContinue.dispatch();
        console.log("continue");
    }

    private backToMenu(): void
    {
        this.game.paused = false;
        this.game.state.start(Menu.Name);
        console.log("back to the menu");
    }
}