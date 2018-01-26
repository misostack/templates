const webpack = require('webpack'); //to access built-in plugins
const merge = require("webpack-merge");
const path = require('path');
const prod = process.argv.indexOf('-p') !== -1;
const ASSET_PATH = process.env.ASSET_PATH || '';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ExtractSASS = new ExtractTextPlugin({filename: 'styles.css'});
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC_DIR = path.resolve(__dirname,'src');
const DIST_DIR = path.resolve(__dirname, 'dist');
const parts = require("./webpack.parts");

function getCSSLoader(){
  return {
    test: /\.css$/,
    include: /node_modules/,
    loader:  ['style-loader','css-loader']
  }
}

function getSassLoader(){
  var loader = null;
  if(prod){
    loader = { 
      test: /\.scss$/,
      use: ExtractSASS.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }              
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
      })
    };
  }else{
    loader = {
      test: /\.scss$/,
      use: [{
          loader: "style-loader"
      }, {
          loader: "css-loader"
      }, {
          loader: "sass-loader"          
      }]
    };
  }
  return loader;
}

function getImagesLoader()
{
  return { test: /\.(png|svg|jpe?g|gif)$/i, use: [
    {
      loader: 'file-loader',
      options: {            
        name: 'images/[name].[ext]',
        outputPath: '',
        useRelativePath: false            
      }
    }
  ] };
}

function getFontLoader(){
  return { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] };
}

function getPlugins(){
  var plugins = [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: false
    }),
    new HtmlWebpackPlugin({
      template: SRC_DIR + '/index.html'
    }),
    ExtractSASS,
    new CopyWebpackPlugin([
      { from:SRC_DIR + '/images', to: DIST_DIR + '/images' }
    ]),     
    new webpack.HotModuleReplacementPlugin(),
    // bootstrap,jquery,highlightjs
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      // hljs: ['highlight.js/lib/index.js']
      Prism: ['prismjs/prism.js'],
      nv: ['nvd3/build/nv.d3.js']
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

const commonConfig = {
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
    extensions: ['.js', '.css', '.scss']
  },    
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        include: SRC_DIR,
        loader: "babel-loader",
        options: {
          presets: ['env']
        }
      },
      getCSSLoader(),
      getSassLoader(),
      getFontLoader(),
      // getImagesLoader()
    ]
  },
  plugins: getPlugins()
};

const productionConfig = merge([
  parts.loadImages({
    options: {
      limit: 15000,
      name: "[name].[ext]",
    },
  }),
]);

const developmentConfig = merge([
  parts.loadImages(),
]);

module.exports = env => {
  if (env === "production") {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};