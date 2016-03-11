import path from 'path';

export default {
    entry: path.resolve(__dirname, 'lib/index.js'),
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
    }
};
