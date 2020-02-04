const   path    = require('path'),
        webpack = require('webpack');

module.exports = {
    mode : 'development',
    entry : {
        gm_poly_draw: './src/entry.js'
    }, 
    output: {
        path : path.resolve(__dirname, "./dist/"),
        filename : 'gm_poly_draw.js'
    },
    module:{
        rules:[
            // {
            //     test: /\.(html)$/,
            //     use: [{
            //         loader: 'html-loader',
            //         options: {
            //             minimize: true,
            //             removeComments: true,
            //             collapseWhitespace: false
            //         }
            //     }]
            // }
            // ,
            // {
            //     test:/\.css$/,
            //     use:['style-loader','css-loader']
            // }
            // ,
            // {
            //     test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            //     use: [{
            //         loader: 'url-loader?limit=100000',
            //         options: {
            //             name: '[name].[ext]',
            //             outputPath: path.resolve(__dirname, "./webpack/files")
            //         }
            //     }]
            // }
            
       ]
    }, 
    watch : true
}