import Tile from './GridObjects/Tile';

export default class Input
{
    public  game: Phaser.Game;

    public onDragSnap: Phaser.Signal;
    public onInputUp: Phaser.Signal;

    private _currentSnap: Tile;

    constructor(game: Phaser.Game)
    {
        this.game = game;

        this.onDragSnap = new Phaser.Signal();
        this.onInputUp = new Phaser.Signal();

        this.game.input.onUp.add(() => this.inputUp());
    }

    /* For when the input is up */
    private inputUp(): void
    {
        this._currentSnap = null;
        this.onInputUp.dispatch();
    }

    /* Call this in the update so that the class will fire it's 'onDragSnap' signal when a new tile is snapped */
    public checkInputOnTiles(checkTiles: Tile[]): void
    {
        if (this.game.input.activePointer.isDown === false) { return; }

        for (let i: number = checkTiles.length; i--; )
        {
            let currentTile: Tile = checkTiles[i];
            if (currentTile.getBounds().contains(this.game.input.x, this.game.input.y) === false) { continue; }

            if (this._currentSnap === currentTile) { return; }

            this._currentSnap = currentTile;
            this.onDragSnap.dispatch(currentTile);
        }

    }

    public destroy(): void
    {
        this.onDragSnap.removeAll();
        this.onDragSnap = null;

        this.onInputUp.removeAll();
        this.onInputUp = null;

        this._currentSnap = null;
    }
}
