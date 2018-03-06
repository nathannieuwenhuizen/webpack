'use strict';

const path = require('path');
const basePath = path.join(__dirname, '../');
const config = require('../package.json');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: {main :[path.join(basePath, 'src/app.ts'),
        path.join(basePath, 'sass/main.scss')] },
    devtool: 'inline-source-map',
    module: {
        rules: [
            // Setting the rules for specific modules
            {    
                test: /\.tsx?$/,
                use: 'ts-loader',
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
                                // If you are having trouble with urls not resolving add this setting.
                                // See https://github.com/webpack-contrib/css-loader#url
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
            }
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
        path: path.join(basePath, 'dev/'),
        publicPath: "../assets/"
    },
    watch: true,

    plugins: [
        new ExtractTextPlugin({
            filename: 'assets/style.css'
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: [
                './template/*.html',
                './src/*.ts',
                './sass/*.scss',
                './scr/*.js'
            ],
            server: {
                baseDir: ['./dev']
            }
        }, {
            reload: false
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(basePath, 'node_modules/phaser-ce/build/custom/p2.js'),
                to: path.join(basePath, 'dev/vendor/p2.js')
            },
            {
                from: path.join(basePath, 'node_modules/phaser-ce/build/custom/pixi.js'),
                to: path.join(basePath, 'dev/vendor/pixi.js')
            },
            {
                from: path.join(basePath, 'node_modules/phaser-ce/build/custom/phaser-split.js'),
                to: path.join(basePath, 'dev/vendor/phaser.js')
            },
            {
                from: path.join(basePath, 'assets'),
                to: path.join(basePath, 'dev/assets')
            },
            {
                from: path.join(basePath, 'template/index.html'),
                to: path.join(basePath, 'dev/index.html')
            }
        ])
  ]

};
