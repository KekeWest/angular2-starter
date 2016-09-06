'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.NODE_ENV;
const isProd = ENV === 'prod';
const isDev = ENV === 'dev' || ENV === '';

const config = {
    entry: {
        vendor: path.join(__dirname, 'src/vendor.ts'),
        main: path.join(__dirname, 'src/main.ts'),
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js',
        publicPath: '/0_0_1/'
    },

    devtool: 'cheap-module-eval-source-map',

    devServer: {
        contentBase: './dist',
        inline: true
    },

    resolve: {
        root: path.join(__dirname, 'src'),
        extensions: ['', '.ts', '.js', '.css', '.scss', '.html']
    },

    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'awesome-typescript'
        }, {
            test: /\.scss$/,
            loaders: ['raw', 'css', 'sass'],
            exclude: /node_modules/
        }, {
            test: /\.html$/,
            loaders: ['raw'],
            exclude: ['src/index.html']
        }]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true
        }),
        new CopyWebpackPlugin([{
            from: 'src/**/*.html',
            to: 'dist'
        }]),
    ]
};

// プロダクション用の設定
if (isProd) {
    config.plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );
}

module.exports = config;
