const path = require('path');
const basePath = path.join(__dirname, '../');
const config = require('../package.json');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

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
            },
            {test: /\.png$/, loaders: [
                'file-loader?name=i/[hash].[ext]'
            ]}
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
        }]),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, '../atlas_assets'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, '../dev/assets/atlases/sprite.png'),
                css: [
                    //optional if we want a css file referencing the atlas
                    //path.resolve(__dirname, '../dev/assets/atlases/sprite.css'),
                    [path.resolve(__dirname, '../dev/assets/atlases/sprite.json'), {
                        format: 'json_texture'
                    }]
                ]
            },
            apiOptions: {
                cssImageRef: "~sprite.png"
            }
        })
  ]

};
