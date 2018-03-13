import 'phaser-ce';

export default class Timer
{

   // private _countNumber: number = 60;

    constructor()
    {
        this.startTimer();
    }

    public startTimer():void
    {
        let i = 5;
       let thisTimer = setInterval(function() 
        {
            console.log('count '+(i--));

            if (i <= 0)
            {
                console.log("time up");
                clearInterval(thisTimer);
            }
            
        },1000);
    }
    
    public stopTimer():void
    {
       // clearInterval(thisTimer);
    }

    public create(): void
    {
        
    

       // this._timerClass.startTimer();

        
    }

    public shutdown():void
    {

    }

}