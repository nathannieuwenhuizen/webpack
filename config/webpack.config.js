'use strict';

const webpack = require('webpack');
const path = require('path');
const basePath = path.join(__dirname, '../');
const config = require('../package.json');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pathsToClean = ['dev'];
const cleanOptions = { root: path.join(__dirname, '../builds'), verbose: true, dry: false, exclude: [],};
const HappyPack = require('happypack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');

module.exports = { 

    entry: {main :[path.join(basePath, 'ts/app.ts'),
        path.join(basePath, 'sass/main.scss')] },
    devtool: 'inline-source-map',
    module: {
        rules: [
            // Setting the rules for specific modules
            {    
                test: /\.tsx?$/,
                use: 'happypack/loader?id=ts',
                exclude: /node_modules/
            },
            {
                test: /pixi\.js$/,
                loader: 'expose-loader?PIXI',
            },
            {
                test: /phaser-split\.js$/,
                loader: 'expose-loader?Phaser',
            },
            {
                test: /p2\.js$/,
                loader: 'expose-loader?p2',
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { 
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {test: /\.png$/, loaders: [
                'file-loader?name=i/[hash].[ext]'
            ]}
    ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            pixi: path.join(basePath, 'node_modules/phaser-ce/build/custom/pixi.js'),
            phaser: path.join(basePath, 'node_modules/phaser-ce/custom/phaser-split.js'),
            p2: path.join(basePath, 'node_modules/phaser-ce/build/custom/p2.js'),
            assets: path.join('assets/')
        }
    },
    output: {
        filename: 'game.js',
        path: path.join(basePath, 'builds/dev/'),
        publicPath: "../assets/"
    },
    watch: true,

    plugins: [
        new webpack.DefinePlugin({
            'GAME_WIDTH': 720,
            'GAME_HEIGHT': 1280,
            'DEBUG': true,
            'version': JSON.stringify('dev'),
            'libs': JSON.stringify([
                'node_modules/@orange-games/phaser-spine/build/phaser-spine.js'
            ])
        }),
        new ExtractTextPlugin({
            filename: 'assets/style.css'
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: [
                './template/*.html',
                './ts/*.ts',
                './sass/*.scss',
                './ts/*.js'
            ],
            server: {
                baseDir: ['./builds/dev']
            }
        }, {
            reload: true
        }),
        new HappyPack({
            id: 'ts',
            verbose: false,
            threads: 2,
            loaders: [
                {
                    path: 'ts-loader',
                    query: {happyPackMode: true},
                },
            ],
        }),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new CopyWebpackPlugin([
            {
                from: path.join(basePath, 'node_modules/phaser-ce/build/custom/p2.js'),
                to: path.join(basePath, 'builds/dev/vendor/p2.js')
            },
            {
                from: path.join(basePath, 'node_modules/phaser-ce/build/custom/pixi.js'),
                to: path.join(basePath, 'builds/dev/vendor/pixi.js')
            },
            {
                from: path.join(basePath, 'node_modules/phaser-ce/build/custom/phaser-split.js'),
                to: path.join(basePath, 'builds/dev/vendor/phaser.js')
            },
            {
                from: path.join(basePath, 'node_modules/@orange-games/phaser-spine/build/phaser-spine.js'),
                to: path.join(basePath, 'builds/dev/vendor/phaserspine.js')
            },
            {
                from: path.join(basePath, 'assets'),
                to: path.join(basePath, 'builds/dev/assets')
            },
            {
                from: path.join(basePath, 'template/index.html'),
                to: path.join(basePath, 'builds/dev/index.html')
            }
        ]),
        new ForkTsCheckerNotifierWebpackPlugin({alwaysNotify: true}),
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            tslint: path.join(__dirname, '../tslint.json'),
            tsconfig: path.join(__dirname, '../tsconfig.json'),
        }),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, '../atlas_assets'),
                glob: '**/*.png'
            },
            target: {
                image: path.resolve(__dirname, '../builds/dev/assets/atlases/sprite.png'),
                css: [
                    //optional if we want a css file referencing the atlas
                    //path.resolve(__dirname, '../builds/dev/assets/atlases/sprite.css'),
                    [path.resolve(__dirname, '../builds/dev/assets/atlases/sprite.json'), {
                        format: 'json_texture'
                    }]
                ]
            },
            apiOptions: {
                cssImageRef: "~sprite.png"
            },
            spritesmithOptions: {
                padding: 5
            },
        })
  ]

};
