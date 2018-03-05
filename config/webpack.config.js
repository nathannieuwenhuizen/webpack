const path = require('path');
const basePath = path.join(__dirname, '../');
const config = require('../package.json');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: {main :[path.join(basePath, 'src/script.ts'),
        path.join(basePath, 'sass/main.scss')] },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
      },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
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
                './scr/*.js'],
            server: {
                baseDir: ['./dev']
            }
        }, {
            reload: false
        }),
        new CopyWebpackPlugin([{
            from: path.join(basePath, 'assets'),
            to: path.join(basePath, 'dev/assets')
        }]),
        new CopyWebpackPlugin([{
            from: path.join(basePath, 'template/index.html'),
            to: path.join(basePath, 'dev/index.html')
        }])
  ]

};
