import 'phaser-ce';

import Images from '../Data/Images';
import Spines from '../Data/Spines';
import Timer from '../BackEnd/Timer';
import TimeBar from '../UI/TimeBar';

export default class Gameplay extends Phaser.State 
{
    public static Name: string = 'gameplay';

    public name: string = Gameplay.Name;

    private _timeBar: TimeBar;
    private _timerClass: Timer;

    constructor()
    {
        super();
    }

    public resize(): void {
        console.log('resize');
    }

    public create(): void
    {
        super.create(this.game);

        this._timerClass = new Timer();
        this._timeBar = new TimeBar(this.game,0,0);

        let text = this.game.add.text(0, 0, 'this is the gameplay state', {font: '50px',
        fill: '#fff',
        align: 'center'});
    }

    public shutdown(): void
    {
        super.shutdown(this.game);
    }

}
