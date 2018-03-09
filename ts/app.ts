import 'phaser-ce';

import Gameplay from './States/Gameplay';

namespace WebPackGame 
{
    export class Game extends Phaser.Game 
    {
        constructor() 
        {
            // Game settings
            super(<Phaser.IGameConfig>{
                enableDebug: false,
                width: GAME_WIDTH,
                height: GAME_HEIGHT,
                renderer: Phaser.AUTO,
                parent: 'content',
                // transparent: true,
                antialias: true,
                preserveDrawingBuffer: false
            });
            this.clearBeforeRender = false;
            console.log(GAME_HEIGHT);

            this.state.add('game', {
                create: this.stateCreator.bind(this),
                preload: this.statePreloader.bind(this)
            }, true);
        }

        private statePreloader(): void {
            // libs.forEach((library: string) => {
            //     this.load.script(library, library);
            // });
        }

        private stateCreator(): void {
            //Here we load all the plugins
            this.plugins.add(PhaserSpine.SpinePlugin);

            // Add the states here
            this.state.add(Gameplay.Name, Gameplay, false);

            // Starting the first state
            this.state.start(Gameplay.Name);
            this.state.remove('game');
        }
    }
}

// Creating a game instance 
// It'll be in the global scope and will have no reference
new WebPackGame.Game();