const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry:{
        app:'./src/index.js'
    },
    mode:"production",
    devServer:{
        contentBase:'./dist',
        hot:true,
        open:true
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:"babel-loader?cacheDirectory=true",
                include: path.resolve(__dirname,"src")
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(png|jpg|woff|woff2|svg)$/,
                use:'file-loader?limit=8192'
            },
        ]
        
        
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            
            template:'./src/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname,'dist')
    }
}