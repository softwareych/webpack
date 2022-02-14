const HtmlWebpack = require( 'html-webpack-plugin')
const MiniCssExtract = require("mini-css-extract-plugin");
//const { default: loader } = require('mini-css-extract-plugin/types/loader');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',

    output: {
        clean: true //elimina el dist y lo crea al compilar entre otras cosas
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [ MiniCssExtract.loader, 'css-loader' ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            }
        ]        
    },

    optimization: {},

    plugins: [
        new HtmlWebpack({
            title: 'Mi Webpack App',
            //filename: 'index.html',
            template: './src/index.html' //hace que todo lo que coloque en mi index lo pase al inex de la carpeta dist, por lo cual no se deben hacer  cambios en el index del dist pq siempre se modificara con lo que hago en el index de src            
        }),

        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }) ,

        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })

    ]
}