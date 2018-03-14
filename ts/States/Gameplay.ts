import 'phaser-ce';

import Images from '../Data/Images';
import Spines from '../Data/Spines';

import GameField from '../Objects/GameObjects/GameField';
import Tile from '../Objects/GridObjects/Tile';

import TextButton from '../UI/TextButton';
import PauseMenu from '../UI/PauseMenu';
import Timer from '../BackEnd/Timer';
import TimeBar from '../UI/TimeBar';
import Atlases from '../Data/Atlases';
import ImageButton from '../UI/ImageButton';
import Character from '../Objects/Character';
export default class Gameplay extends Phaser.State
{
    public static Name: string = 'gameplay';

    public name: string = Gameplay.Name;

    private _testSprite: Phaser.Sprite;
    private _timeBar: TimeBar;
    private _timerClass: Timer;

    private _gameField: GameField;

    private pauseMenuButton: ImageButton;
    private socialMenuButton: ImageButton;

    private _pauseMenu: PauseMenu;

    private _highscoreBackdropSprite: Phaser.Sprite;

    private _character: Character;

    constructor()
    {
        super();
    }

    public resize(): void {
        this._pauseMenu.resize();

        this._highscoreBackdropSprite.scale.set(this.game.width / GAME_WIDTH);
        this._highscoreBackdropSprite.x = this.game.width / 2;

        this.pauseMenuButton.scale.set(this.game.width / GAME_WIDTH);
        this.pauseMenuButton.position.set(this.pauseMenuButton.width / 2, this.pauseMenuButton.height / 2);

        this.socialMenuButton.scale.set(this.game.width / GAME_WIDTH);
        this.socialMenuButton.position.set(this.game.width - this.pauseMenuButton.width / 2, this.pauseMenuButton.height / 2);

        this._character.position.set(this.game.width / 2, this.game.height * .3);
    }

    public pause(paused: boolean): void
    {
        this.game.paused = paused;
    }

    public create(): void
    {
        super.create(this.game);

        this._character = new Character(this.game, 0, 0);

        this._timerClass = new Timer();
        this._timeBar = new TimeBar(this.game, 0, 0);

        this._gameField = new GameField(this.game);
        this.game.add.existing(this._gameField);

        this._highscoreBackdropSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Interface, 'ui_ingame_highscore_backdrop');
        this._highscoreBackdropSprite.anchor.set(0.5, 0);
        this.game.add.existing(this._highscoreBackdropSprite);

        this._pauseMenu = new PauseMenu(this.game, 0.6, 120, 125, Images.PopUpMenuBackground);

        this._pauseMenu.onContinue.add(this.disableMenu, this);
        this.pauseMenuButton = new ImageButton(this.game, 0, 0, '', this.activateMenu, this );
        this.game.add.existing(this.pauseMenuButton);

        this.socialMenuButton = new ImageButton(this.game, 0, 0, '', this.activateSocial, this );
        this.game.add.existing(this.socialMenuButton);
        this.resize();
    }

    public newPathCreated(path: Tile[]): void
    {
        console.log('new path!: ', path);
    }

    public shutdown(): void
    {
        super.shutdown(this.game);

        this._gameField.destroy();
        this._gameField = null;

    }

    private activateMenu(): void
    {
        //pause the game
        //stop the timer from moving et cetera
        this.pause(true);
        this._pauseMenu.visible = true;
        this.pauseMenuButton.visible = false;

    }
    preload activateSocial(): void 
    {
        console.log('socialiceren? NANI!');
    }

    private disableMenu(): void
    {
        this.pause(false);
        this.pauseMenuButton.visible = true;
    }

}
