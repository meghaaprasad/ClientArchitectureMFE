const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'container.bundle.js',
    publicPath: 'http://localhost:3000/',
    crossOriginLoading: 'anonymous',
  },
  stats: {
    logging: 'verbose', // Debug shared modules
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'), // Explicitly use Dart Sass
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'container',
      filename: 'remoteEntry.js',
      exposes: {
        './store': './src/store.js',
      },
      remotes: {
        checkDetails: 'checkDetails@http://localhost:3001/remoteEntry.js',
        payPremium: 'payPremium@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^3.5.13', // Match the installed version
        },
        'vue-router': {
          singleton: true,
          requiredVersion: '^4.5.0', // Match the installed version
        },
        vuex: {
          singleton: true,
          requiredVersion: '^4.1.0', // Match the installed version
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
};
