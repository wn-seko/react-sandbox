const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')
const API_URL = 'http://localhost:5000'

const stringToBoolean = (bool) => !!bool && bool !== 'false'

const isAnalyze = stringToBoolean(process.env.ANALYZE)

module.exports = merge(common, {
  mode: isAnalyze ? 'production' : 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      API_URL: `"${API_URL}"`,
    }),
  ].concat(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: '.',
  },
  devtool: 'source-map',
})
