import 'phaser-ce';

import Images from '../Data/Images';
import Spines from '../Data/Spines';

import GameField from '../Objects/GameObjects/GameField';
import Tile from '../Objects/GridObjects/Tile';

import TextButton from '../UI/TextButton';
import PauseMenu from '../UI/PauseMenu';
import Timer from '../BackEnd/Timer';
import TimeBar from '../UI/TimeBar';

export default class Gameplay extends Phaser.State
{
    public static Name: string = 'gameplay';

    public name: string = Gameplay.Name;

    private _testSprite: Phaser.Sprite;
    private _timeBar: TimeBar;
    private _timerClass: Timer;

    private _gameField: GameField;

    private pauseMenuButton: TextButton;

    private _pauseMenu: PauseMenu;

    constructor()
    {
        super();
    }

    public resize(): void {
        this._pauseMenu.resize();
    }

    public pause(paused: boolean): void
    {
        this.game.paused = paused;
    }

    public create(): void
    {
        super.create(this.game);

        this._timerClass = new Timer();
        this._timeBar = new TimeBar(this.game, 0, 0);

        this.game.add.text(0, 0, 'this is the gameplay state', {
            font: '50px',
            fill: '#fff',
            align: 'center'
        });

        this._gameField = new GameField(this.game);
        this.game.add.existing(this._gameField);

        this._pauseMenu = new PauseMenu(this.game, 100, 100, 100, Images.CaviaTest , Images.CaviaTest);
        this._pauseMenu.onContinue.add(this.disableMenu, this);
        this.pauseMenuButton = new TextButton(this.game, 100, 100, '||', {font: '50px',
        fill: '#fff', align: 'center'}, this.activateMenu, this );

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

    }

    private disableMenu(): void
    {
        this.pause(false);
    }

}
