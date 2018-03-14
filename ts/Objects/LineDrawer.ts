import 'phaser-ce';

import Tile from './GridObjects/Tile';

export default class LineDrawer
{

    public game: Phaser.Game;

    private _drawGraphics: Phaser.Graphics;

    constructor(game: Phaser.Game)
    {
        this.game = game;

        this._drawGraphics = new Phaser.Graphics(game);
        this.game.add.existing(this._drawGraphics);
    }

    /* Draw a path */
    public drawPath(tiles: Tile[], lineWidth: number, color: number): void
    {
        this.clearPath();

        if (tiles.length <= 1) { return; }

        this._drawGraphics.beginFill();
        this._drawGraphics.lineStyle(lineWidth, color);

        this._drawGraphics.moveTo(tiles[0].worldPosition.x, tiles[0].worldPosition.y);

        for (let i: number = 1; i < tiles.length; i++)
        {
            let currentTile: Tile = tiles[i];

            this._drawGraphics.lineTo(currentTile.worldPosition.x, currentTile.worldPosition.y);
            this._drawGraphics.moveTo(currentTile.worldPosition.x, currentTile.worldPosition.y);

        }

        this._drawGraphics.endFill();
    }

    /* Clear the path */
    public clearPath(): void
    {
        this._drawGraphics.clear();
    }

    public destroy(): void
    {
        this._drawGraphics.destroy(true);
        this._drawGraphics = null;
    }
}
