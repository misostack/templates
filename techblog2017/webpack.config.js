const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const prod = process.argv.indexOf('-p') !== -1;
const ASSET_PATH = process.env.ASSET_PATH || '';
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm

var SRC_DIR = path.resolve(__dirname,'src');
var DIST_DIR = path.resolve(__dirname, 'dist');

function getPlugins(){
  var plugins = [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: false
    }),
    new HtmlWebpackPlugin({
      template: SRC_DIR + '/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // bootstrap,jquery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ];
  if(prod){
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({})
    );
  }
  return plugins;
}

function getDevTool(){
  return prod ? 'none' : 'inline-source-map';
}

const config = {
  entry: {
    app: SRC_DIR + '/index.js'
  },
  output: {
    path: DIST_DIR,
    filename: '[name].bundle.js',
    publicPath: ASSET_PATH
  },
  devServer: {
    contentBase: DIST_DIR,
    hot: true,
    clientLogLevel: "none",
    historyApiFallback: true
  },  
  devtool: getDevTool(),
  resolve: {
    modules: [SRC_DIR, "node_modules"],
    extensions: ['.js']
  },    
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        include: SRC_DIR,
        loader: "babel-loader",
        options: {
          presets: ['es2015','stage-2']
        }
      }
    ]
  },
  plugins: getPlugins()
};

module.exports = config;