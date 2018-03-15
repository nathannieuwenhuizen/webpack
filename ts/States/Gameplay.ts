import 'phaser-ce';

import Images from '../Data/Images';
import Spines from '../Data/Spines';
import TextButton from '../UI/TextButton';
import PauseMenu from '../UI/PauseMenu';
import Timer from '../BackEnd/Timer';
import TimeBar from '../UI/TimeBar';
import TimeBarScaler from '../BackEnd/TimeBarScaler';

export default class Gameplay extends Phaser.State
{
    public static Name: string = 'gameplay';

    public name: string = Gameplay.Name;

    private _timeBar: TimeBar;
    private _timerClass: Timer;
    private _timeScalerClass: TimeBarScaler;

    private pauseMenuButton: TextButton;

    private _pauseMenu: PauseMenu;

    constructor()
    {
        super();
    }

    public resize(): void {
       // console.log('resize');
        this._pauseMenu.resize();
    }

    public pause(paused: boolean): void
    {
      //  console.log(paused);
        this.game.paused = paused;
    }

    public create(): void
    {
        super.create(this.game);

        this.game.add.text(0, 0, 'this is the gameplay state', {
            font: '50px',
            fill: '#fff',
            align: 'center'
        });

        this._pauseMenu = new PauseMenu(this.game, 100, 100, 100, Images.CaviaTest , Images.CaviaTest );
        this._pauseMenu.onContinue.add(this.disableMenu, this);
        this.pauseMenuButton = new TextButton(this.game, 100, 100, '||', {font: '50px',
        fill: '#fff', align: 'center'}, this.activateMenu, this );

        this._timerClass = new Timer();
        this._timeBar = new TimeBar(this.game, 0, 0);
        this._timeScalerClass = new TimeBarScaler(this.game);
        
        this.resize();  
    }

    public shutdown(): void
    {
        super.shutdown(this.game);
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


    private testAddSeconds():void
    {
        this._timerClass.addSeconds(10);
    }

}
