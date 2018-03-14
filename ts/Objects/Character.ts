import 'phaser-ce';
import IGame from '../PluginManagers/IGame';

export default class Character extends Phaser.Group
{
    public _spine: any;
    public game: IGame;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game);

        this.position.set(x, y);
        this._spine = new PhaserSpine.Spine(<PhaserSpine.SpineGame>(this.game), 'chips');

        this._spine.setAnimationByName(
            0,          //Track index
            'idle',     //Animation's name
            false        //If the animation should loop or not
        );
        this.addChild(this._spine);

    }
}
