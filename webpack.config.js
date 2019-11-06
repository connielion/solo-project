const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const PreCSS = require('precss');


module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer: {
        // Required for Docker to work with dev server
        // host: localhost,
        port: 8080,
        // match the output path
        contentBase: path.resolve(__dirname, 'dist'),
        watchContentBase: true, // file changes will trigger a full page reload.
        // enable Hot Module Replacement on the devServer
        hot: true,
        // match the output 'publicPath'
        publicPath: '/',
        // fallback to root for other urls
        historyApiFallback: true,
        inline: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        /**
         * proxy is required in order to make api calls to
         * express server while using hot-reload webpack server
         * routes api fetch requests from localhost:8080/api/* (webpack dev server)
         * to localhost:3000/api/* (where our Express server is running)
         */
        proxy: {
            '/api/**': {
                target: 'http://localhost:3000/',
                secure: false,
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]// end of rules array
    },// end of modules object
    plugins: [
        require('autoprefixer'),
        require('postcss'),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: "./index.html"
        })
    ],
    resolve: {
        // Enable importing JS / JSX files without specifying their extension
        extensions: ['.js', '.jsx'],
    }
};