const webpack = require('webpack');
const path = require('path');
const cpus = require('os').cpus().length;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: cpus});
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV;

const node_modules = path.resolve(__dirname, 'node_modules');

const config = {
  cache: true,
  entry: path.resolve(__dirname, 'src/client/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/[name].[hash:8].js',
    publicPath: ''
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src/client'),
      'node_modules'
    ],
    alias: {
      '@client': path.resolve(__dirname, 'src/client'),
      '@containers': path.resolve(__dirname, 'src/client/containers'),
      '@components': path.resolve(__dirname, 'src/client/components')
    }
  }
};

// mode 环境
config.mode = ENV;

// module loaders
config.module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'happypack/loader?id=js'
    }, {
      test: /\.(less|css)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader', 'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              // javascriptEnabled: true
            }
          }
        ]
      })
    }, {
      test: /\.(png|jpe?g|gif)$/,
      use: [ {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/img/[name].[hash:8].[ext]'
        }
      } ]
    }, {
      test: /\.(ttf|svg|eot|woff)$/,
      use: 'url-loader?limit=100&name=static/fonts/[name].[hash:8].[ext]'
    }, {
      test: /\.(svg)$/,
      use: 'svg-sprite-loader?limit=100&name=static/svg/[name].[hash:8].[ext]'
    }
  ]
};

// plugins
config.plugins = [
  new CaseSensitivePathsPlugin(),
  new CleanPlugin([ path.resolve(__dirname, 'dist') ], {verbose: true}),
  new ExtractTextPlugin({filename: 'static/[name].[hash:8].css', allChunks: true}),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(ENV)
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: ENV === 'production'
  }),
  new webpack.HashedModuleIdsPlugin(),
  new webpack.ContextReplacementPlugin(
    /moment[\\\/]locale$/,
    /^\.\/(zh-cn)$/
  ),
  new HappyPack({
    id: 'js',
    threadPool: happyThreadPool,
    loaders: [ 'babel-loader' ],
    verboseWhenProfiling: true
  }),
  new HtmlWebpackPlugin({
    title: 'React Components',
    filename: 'index.html',
    template: path.resolve(__dirname, 'src/server/index.html'),
    favicon: path.resolve(__dirname, 'src/server/favicon.ico'),
    inject: true,
    minify: {
      removeComments: false,
      collapseWhitespace: ENV !== 'production',
    },
  }),
  new CopyWebpackPlugin([
    {
      from: path.resolve(node_modules, 'babel-polyfill/dist/polyfill.min.js'),
      to: path.resolve(__dirname, 'dist/static')
    }
  ])
];

// optimization
config.optimization = {
  splitChunks: {
    cacheGroups: {
      // 处理入口chunk
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        chunks: 'initial',
        name: 'vendors',
      },
      // 处理异步chunk
      'async-vendors': {
        test: /[\\/]node_modules[\\/]/,
        minChunks: 2,
        chunks: 'async',
        name: 'async-vendors'
      }
    }
  }
};

config.mode = ENV;
if (ENV === 'development') {
  config.devtool = 'eval-source-map';
  config.output.path = path.resolve(__dirname, 'dist');
  config.output.publicPath = '/';
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.devServer = {
    contentBase: config.output.path,
    port: 4000,
    index: `index.html`,
    hot: true,
    https: false,
    historyApiFallback: {
      index: 'index.html'
    }
  };

}

if (ENV === 'production') {
  config.optimization.minimize = true;
  config.optimization.noEmitOnErrors = true;
  config.optimization.concatenateModules = true;
  // const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  // config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
