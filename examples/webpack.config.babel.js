import path from 'path';
import webpack from 'webpack';

export default {
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
        path: path.join(__dirname),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: [
                        'transform-decorators-legacy'
                    ]
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
        modulesDirectories: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '../node_modules')
        ]
    }
};
