const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    TableWidget: path.resolve(__dirname, './src/index.tsx')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].min.js',
    publicPath: './dist/',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    modules: [path.resolve('src'), path.resolve('node_modules')],
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, './src/')
      }
    ]
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: ['react'],
        amd: 'react'
      }
    },
    /@material-ui\/.*/
  ]
}
