const path = require('path');

if (process.env.NODE_ENV === 'production') {
}

module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './app/assets/javascripts')
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        }
      },
      {
        test: /\.scss?/,
        include: [
          path.resolve(__dirname, 'src/css')
        ],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};
