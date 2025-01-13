const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/main.js',
  mode: 'development',
  devtool: 'source-map', // Enable source maps for debugging
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3001/', // Update based on your app port
  },
  stats: {
    logging: 'verbose', // Detailed logs for debugging
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3001,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Resource-Policy': 'cross-origin',
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'checkDetails',
      filename: 'remoteEntry.js',
      exposes: {
        './CheckDetails': './src/App.vue',
      },
      remotes: {
        container: 'container@http://localhost:3000/remoteEntry.js',
      },
      shared: {
        vue: {
            singleton: true, // Ensure one Vue instance across apps
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
  ],
};
