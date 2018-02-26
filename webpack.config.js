const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {

    entry: './src/script.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
      }
    ]
    }, 
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'game.js',
        path: path.resolve(__dirname, 'dev'),
        publicPath: "/assets/" 
    },
    watch: true,
    //    module: {
    //        rules: [
    //            {
    //                test: /\.css$/,
    //                use: [
    //           'style-loader',
    //           'css-loader'
    //         ]
    //       },
    //            {
    //                test: /\.(png|svg|jpg|gif)$/,
    //                use: [
    //           'file-loader'
    //         ]
    //        }
    //     ] 
    //    },
    plugins: [
    new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: ['./dev/*.html', './src/*.ts', './scr/*.js'],
            server: {
                baseDir: ['dev']
            }
        }, {
            reload: false
        })
  ]

};
