const webpack = require('webpack');
const path = require('path');
const cpus = require('os').cpus().length;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: cpus});
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const StatsOutPlugin = require('stats-out-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV;

const config = {
  cache: true,
  entry: {
    app: path.resolve(__dirname, 'src/client/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: '[name].[hash:8].js',
    publicPath: 'static'
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
          name: 'img/[name].[hash:8].[ext]',
          publicPath: 'static'
        }
      } ]
    }, {
      test: /\.(ttf|svg|eot|woff)$/,
      use: 'url-loader?limit=100&name=/fonts/[name].[hash:8].[ext]'
    }, {
      test: /\.(svg)$/,
      use: 'svg-sprite-loader?limit=100&name=/svg/[name].[hash:8].[ext]'
    }
  ]
};

// plugins
config.plugins = [
  new CaseSensitivePathsPlugin(),
  new CleanPlugin([path.resolve(__dirname, 'dist')], {verbose: true}),
  new ExtractTextPlugin({filename: '[name].[contenthash:8].css', allChunks: true}),
  new webpack.optimize.ModuleConcatenationPlugin(),
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
    loaders: ['babel-loader']
  }),
  new HtmlWebpackPlugin({
    title: 'React Components',
    filename: '../index.html',
    template: path.resolve(__dirname, 'src/server/index.html'),
    inject: true,
    minify: {
      removeComments: false,
      collapseWhitespace: ENV !== 'production',
    },
  }),
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

if (ENV === 'development') {
  config.devtool = 'eval-source-map';
  config.output.path = path.resolve(__dirname, 'dist');
  config.output.publicPath = '/';
  config.entry.app = ['webpack-hot-middleware/client?reload=true', config.entry.app];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (ENV === 'production') {
  config.optimization.minimize = true;
  config.optimization.noEmitOnErrors = true;
  config.optimization.concatenateModules = true;
  const stats = new StatsOutPlugin('chunkNames.json', {});
  config.plugins.push(stats);
  // const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  // config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
