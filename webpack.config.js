var webpack=require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

var ExtractTextPlugin = require("extract-text-webpack-plugin");  //分离css

var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');


module.exports = {
	entry:{
		build:'./app/index.js',
		vendors:['react','react-dom','react-redux','jquery'],
		dependency:'./static/dependency-tree.js',
		d3:'./static/d3.js',
	},
	output:{
		filename: '[name].js',
		path: path.join(__dirname, 'dist'),
        publicPagh:'/static/'
	},
	resolve:{
		extensions:['','.js','.css','jsx'],  //自动补全识别后缀
		alias: {
			actions: __dirname + '/app/actions',
			components: __dirname + '/app/components',
			constants: __dirname + '/app/constants',
			images:__dirname+'/app/images',
			reducers: __dirname + '/app/reducers',
			store: __dirname + '/app/store',
			styles:__dirname+'/app/styles',
		},
	},
	module:{
		loaders:[
			{
				test:/.css$/,
				// loaders:['style','css'],
				loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
				 exclude:'/node_modules/'
			},
			{
				test: /\.less$/,
				loader: 'style!css!less',
				exclude:'/node_modules/'
			},
			{
				test:/.jsx?$/,
				loaders:['react-hot','babel-loader?presets[]=es2015&presets[]=react'],
				exclude:'/node_modules/',
				include:path.resolve(__dirname,'app')
			},
			{
				test: /\.(png|jpe?g|gif)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: 'images/version/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader?name=./fonts/[name].[ext]'
			}
		]
	},
	devServer:{

	},
	plugins:[
		new webpack.optimize.CommonsChunkPlugin('vendors','[name].js'),

		new webpack.optimize.UglifyJsPlugin({  //压缩代码
			compress: {
				warnings: false
			}
		}),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),

        new ExtractTextPlugin("style.css"),    //分离css

        new htmlWebpackPlugin({
			title:'数据管理平台',
			chunks:['dependency','d3','build','vendors'],
			hash:true,
			template:__dirname+'/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
		})
	]
}