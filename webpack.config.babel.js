import path from 'path';
import webpack from 'webpack';

export default {
    cache: true,
    target: 'web',
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'react-sortable.js',
        libraryTarget: 'umd',
        library: 'SortableMixin'
    },
    externals: {
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
        'sortablejs': {
            root: 'Sortable',
            commonjs2: 'sortablejs',
            commonjs: 'sortablejs',
            amd: 'sortablejs'
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint'],
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: []
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
