import 'phaser-ce';

import TimeBar from '../UI/TimeBar';
import Timer from '../BackEnd/Timer';

export default class TimeBarScaler
{
    private _timerScript: Timer;
    private _timeBarScript: TimeBar;

    private _timeBarSecond: number;

    constructor(game: Phaser.Game)
    {
        this._timerScript = new Timer();
        this._timeBarScript = new TimeBar(game);
        this._timerScript.onSecond.add(this.adjustScale, this);
    }

    public adjustScale(): void
    {
        // receive Timer.ts signal
        // adjust TimeBar.ts _maskWidth with get set
        // by signal (send parameter?)

        let totalSeconds = this._timerScript.MaxSeconds;
        let currentSecond = this._timerScript.CountNumber;

        let percentStage = (currentSecond - totalSeconds) / totalSeconds;

       // this._timeBarSecond = this._timerScript.CountNumber;
        this._timeBarScript.drawMask(percentStage);
        
        //console.log(percentStage);
        console.log("scale: " + percentStage);
    }

}