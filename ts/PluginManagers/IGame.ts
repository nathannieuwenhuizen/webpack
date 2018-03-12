import 'PhaserSpine';

export default interface IGame extends Phaser.Game {
    add: PhaserSpine.SpineObjectFactory;
    load: PhaserSpine.SpineLoader;
}
