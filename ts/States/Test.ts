import 'phaser-ce';

import IGame from '../PluginManagers/IGame';
import EditorEmitter from '../Editor/emitter';
export default class Test extends Phaser.State
{
    public static Name: string = 'test';

    public name: string = Test.Name;
    public game: IGame;

    public emitter: EditorEmitter;
    public testButton: any;
    private followMouse: boolean = false;

    constructor()
    {
        super();
    }

    public init(): void
    {
        document.getElementById('editor').style.display = 'block';
    }

    public create(): void
    {
        super.create(this.game);

        this.emitter = new EditorEmitter(this.game, this.game.width / 2, this.game.height / 2);

        this.testButton = document.getElementById('test');
        this.testButton.addEventListener('click', () => {
            this.TestParticle();
        });

        this.TestParticle();
    }
    public TestParticle(): void {
        this.emitter.destroy(true);
        this.emitter = null;
        this.emitter = new EditorEmitter(this.game, this.game.width / 2, this.game.height / 2);
        this.followMouse = (<any>document.getElementById('mouse')).checked;

        this.emitter.editorValues = {
        gravity: Math.round((<any>document.getElementById('gravity')).value),
        alphamin: Math.round((<any>document.getElementById('alphamin')).value),
        alphamax: Math.round((<any>document.getElementById('alphamax')).value),
        alpharate: (<any>document.getElementById('alpharate')).value,
        scalemin: Math.round((<any>document.getElementById('scalemin')).value),
        scaleMax: Math.round((<any>document.getElementById('scalemax')).value),
        scaleRate: (<any>document.getElementById('scaleRate')).value,
        minrotation: (<any>document.getElementById('minrotation')).value,
        maxrotation: (<any>document.getElementById('maxrotation')).value,
        minXSpeed: Math.round((<any>document.getElementById('xMinSpeed')).value),
        minYSpeed: Math.round((<any>document.getElementById('yMinSpeed')).value),
        maxXSpeed: Math.round((<any>document.getElementById('xMaxSpeed')).value),
        maxYSpeed: Math.round((<any>document.getElementById('yMaxSpeed')).value),
        explode: (<any>document.getElementById('explode')).checked,
        lifespan: (<any>document.getElementById('lifespan')).value,
        freq: Math.round((<any>document.getElementById('freq')).value),
        width: Math.round((<any>document.getElementById('width')).value),
        height: Math.round((<any>document.getElementById('height')).value),
        spriteName: (<any>document.getElementById('name')).value,
        maxParticles: (<any>document.getElementById('maxparticles')).value
        };

        this.emitter.setUpEmitter();
    }

    public update(): void {
        if (this.followMouse) {
            this.emitter.emitX = this.game.input.activePointer.x;
            this.emitter.emitY = this.game.input.activePointer.y;
        }
    }
    public shutdown(): void
    {
        super.shutdown(this.game);

        //this._testSprite.destroy(true);
        //this._testSprite = null;
    }
}
