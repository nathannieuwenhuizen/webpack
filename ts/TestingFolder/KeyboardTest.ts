import 'phaser-ce';

export default class Gameplay extends Phaser.Keyboard
{


W: Phaser.Key;
A: Phaser.Key;
S: Phaser.Key;
D: Phaser.Key;

constructor(game: Phaser.Game)
{
    super(game);
    

    this.W = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.A = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.S = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.D = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
}
// Create a key for each WASD key
    

}