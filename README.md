# Phaser Typesciprt Sass powered by WebPack
A boilerplate for using [Phaser](https://phaser.io/) with [Typescript](https://www.typescriptlang.org/) and [Sass](https://sass-lang.com/). Powering the task handling is [WebPack](https://webpack.js.org/).

The purpose of this framework is to make the development procces of html5 Phaser games easier and faster.
It's setup as a fundement for our exam project.

## Getting started
After the project is cloned into a local repository you need to install the needed packages.

This is done by running:
```
npm i
```
This will install go through all the packeges defined in the package.json and install them.

### Development
To start using the project as an development tool use the command: 
```
npm run dev
```
This will start WebPack which in it's turn will fire a series of tasks.

### Production
When the project is ready to release, you can make a "as small as possible" version of the project by running:
```
npm run dist
```
## Code
To start coding it is good to know how the project is structured.

### Typescript
All the Typescript code will be located in the 'ts' folder. The initial file that will be run is 'app.ts'.
``` 
ts/app.ts 
```
Here the game instance get's created, and the first stage will be start.
After this, the game will go trough the boot state. Here all the assets get preloaded.
Finally the Gameplay state starts. 
This is where you can start coding your game.
```
ts/States/Gameplay.ts
```

### Assets
Implementing assets is done by doing the following:
1. Add the assets to the source_assets folder.
2. Open the coresponding ts class in the Data folder.
```
ts/Data
```
3. Formulate the name of your asset like so: 
``` typescript
export default class Images 
{

    public static myAsset: string = 'assetFileName';

    public static list: string[] = [
        //Add images to load
        Images.myAsset
    ];
 
}
```
4. Now you can use the asset by using it's name
``` typescript

import Images from '../Data/Images';

this.game.add.sprite(
    300,
    300, 
    Images.myAsset
);

```

# Credits
A lot of the structure and ideas for this boilerplate are gained from the OrangeGames boilerplate: 
[OragaGames boilerplate](https://github.com/orange-games/phaser-ts-boilerplate)

# Handy sources
* [Phaser documentation](https://phaser.io/docs/2.6.2/index)
* [Typescript documentation](https://www.typescriptlang.org/docs/home.html)
* [Sass documentation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
* [Webpack documentation](https://webpack.js.org/concepts/)
* [And ofcourse good'ol](http://google.com)