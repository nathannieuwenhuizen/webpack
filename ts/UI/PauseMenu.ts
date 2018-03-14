import 'phaser-ce';
import TextButton from './TextButton';
import Menu from '../States/Menu';
import Gameplay from '../States/Gameplay';
import Constants from '../Data/Constants';
export default class PauseMenu extends Phaser.Group
{
    private _continueGameButton: TextButton;
    private _backToMenuButton: TextButton;
    private _resetButton: TextButton;
    private _sfxButton: TextButton;
    private _musicButton: TextButton;

    private _pauseText: Phaser.Text;

    private _menuBackground: Phaser.Image;

    public onContinue: Phaser.Signal;

    constructor(game: Phaser.Game, scale: number, buttonOffset: number, spaceBetweenButtons: number, backgroundImage: string)
    {
        super(game);
        this._menuBackground = new Phaser.Image(game, 0, 0, backgroundImage);
        this._menuBackground.anchor.set(0.5);
        this.addChild(this._menuBackground);

        this._pauseText = new Phaser.Text(game, 0, buttonOffset - spaceBetweenButtons * 3, 'Pause', {font: '50px',
        fill: '#fff',
        align: 'center' });
        this._pauseText.anchor.set(0.5);
        this._pauseText.scale.set(scale);
        this.addChild(this._pauseText);

        this._continueGameButton = new TextButton(game, 0,  buttonOffset - spaceBetweenButtons * 2, 'Continue', {font: '50px',
        fill: '#fff',
        align: 'center' }, this.continue, this);
        this._continueGameButton.anchor.set(0.5);
        this._continueGameButton.scale.set(scale);
        this.addChild(this._continueGameButton);

        this._backToMenuButton = new TextButton(game, 0, buttonOffset - spaceBetweenButtons, 'Back To Menu', {font: '50px',
        fill: '#fff',
        align: 'center' }, this.backToMenu, this);
        this._backToMenuButton.anchor.set(0.5);
        this.addChild(this._backToMenuButton);
        this._backToMenuButton.scale.set(scale);
        this.visible = false;
        this.onContinue = new Phaser.Signal();

        this._resetButton = new TextButton(game, 0, buttonOffset, 'Reset Game', {font: '50px',
        fill: '#fff',
        align: 'center' }, this.restartScene, this);
        this._resetButton.anchor.set(0.5);
        this.addChild(this._resetButton);
        this._resetButton.scale.set(scale);

        this._sfxButton = new TextButton(game, - spaceBetweenButtons, buttonOffset +  spaceBetweenButtons, 'SFX', {font: '50px',
        fill: '#fff',
        align: 'center' }, this.sfxToggle, this);
        this._sfxButton.anchor.set(0.5);
        this.addChild(this._sfxButton);
        this._sfxButton.scale.set(scale);

        this._musicButton = new TextButton(game, spaceBetweenButtons, buttonOffset + spaceBetweenButtons, 'M', {font: '50px',
        fill: '#fff',
        align: 'center' }, this.musicToggle, this);
        this._musicButton.anchor.set(0.5);
        this.addChild(this._musicButton);
        this._musicButton.scale.set(scale);

    }

    public resize(): void
    {
        this.x = this.game.width / 2;
        this.y = this.game.height / 2;
    }

    private continue(): void
    {
        this.visible = false;
        this.onContinue.dispatch();
    }

    private backToMenu(): void
    {
        this.game.paused = false;
        this.game.state.start(Menu.Name);
    }

    private restartScene(): void
    {
        this.game.paused = false;
        this.game.state.start(Gameplay.Name);
    }

    private musicToggle(): void
    {
        Constants.PlayMusic = ! Constants.PlayMusic;
    }

    private sfxToggle(): void
    {
        Constants.PlaySoundEffects = ! Constants.PlaySoundEffects;
    }
}
