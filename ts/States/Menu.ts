import 'phaser-ce';

import GamePlay from './Gameplay';
import Test from './Test';
import TextButton from '../UI/TextButton';
import Gameplay from './Gameplay';
export default class Menu extends Phaser.State 
{
    public static Name: string = 'menu';

    public name: string = Menu.Name;

    private playButton: TextButton;
    private testButton: TextButton;
    private nn: number = 5;
    constructor() 
    {
        super();
    }

    public init(): void 
    {
    }

    public create(): void
    {
        super.create(this.game);

        this.playButton = new TextButton(this.game, 100, 150, 'go to gameplay', {font: '50px',
        fill: '#fff',
        align: 'center' }, () => {
            this.state.start(Gameplay.Name);
        }, this, 400, 200, 0x000000);

        this.testButton = new TextButton(this.game, 100, 450, 'go to test', {font: '50px',
        fill: '#fff',
        align: 'center' }, () => {
            this.state.start(Test.Name);
        }, this, 400, 200, 0x000000);
        this.resize();
    }

    public resize(): void
    {
        this.playButton.x = this.game.width / 2;
        this.testButton.x = this.game.width / 2;
    }

    public shutdown(): void 
    {
        super.shutdown(this.game);
        this.testButton.destroy(true);
        this.playButton.destroy(true);
    }

}
