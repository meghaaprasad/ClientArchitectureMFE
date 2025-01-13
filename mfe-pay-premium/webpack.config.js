const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/main.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3002/',
  },
  stats: {
    logging: 'verbose', // Debug shared modules
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
    historyApiFallback: true,
    headers: {
      // Basic CORS header to allow any origin
      'Access-Control-Allow-Origin': '*',
  
      /* 
        If you are doing more advanced "COOP/COEP" setup (for SharedArrayBuffer etc.):
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        ...
      */
    },
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'payPremium',
      filename: 'remoteEntry.js',
      exposes: {
        './PayPremium': './src/App.vue',
      },
       remotes: {
         container: 'container@http://localhost:3000/remoteEntry.js',
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
  ],
};
