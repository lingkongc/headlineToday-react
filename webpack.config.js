const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/js/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    devtool: "inline-source-map", // 不能在生产环境中使用
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            include: path.resolve(__dirname, 'src'),
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            include: path.resolve(__dirname, 'src'),
            use: [
                'file-loader'
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            include: path.resolve(__dirname, 'src'),
            use: [
                'file-loader'
            ]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        hot: true, // Tell the dev-server we're using HMR
        contentBase: path.resolve(__dirname, 'dist'),
    }
};