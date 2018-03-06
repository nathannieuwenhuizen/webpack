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
                renderer: Phaser.AUTO,
                parent: 'content',
                // transparent: true,
                antialias: true,
                preserveDrawingBuffer: false
            });
            this.clearBeforeRender = false;

            // Add the states here
            this.state.add(Gameplay.Name, Gameplay, false);

            // Starting the first state
            this.state.start(Gameplay.Name);

        }
    }
}

// Creating a game instance 
// It'll be in the global scope and will have no reference
new WebPackGame.Game();