const path = require('path');
const basePath = path.join(__dirname, '../');
const config = require('../package.json');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: path.join(basePath, 'src/script.ts'),
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
      },
            {
                test: /\.css$/,
                use: [
               'style-loader',
               'css-loader'
             ]
        }
    ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
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
    new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: [
                './dev/*.html',
                './src/*.ts',
                './assets/*.css',
                './scr/*.js'],
            server: {
                baseDir: ['./dev']
            }
        }, {
            reload: false
        }),
        new CopyWebpackPlugin([{
            from: path.join(basePath, 'assets'),
            to: path.join(basePath, 'dev/assets'),
        }]),
  ]

};
