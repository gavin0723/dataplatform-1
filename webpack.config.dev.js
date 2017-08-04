var webpack=require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');


module.exports = {
	entry:{
		build:'./app/index.js',
        // jquery:'./static/jquery-1.11.1.min.js',
        dependency:'./static/dependency-tree.js',
		d3:'./static/d3.js'
	},
	output:{
		filename: '[name].js',
		path: path.join(__dirname, 'dist'),
        publicPagh:'/static/'
	},
	resolve:{
		extensions:['','.js','.css','jsx'],
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
	externals: {
		// jquery: "jQuery"
	},
	module:{
		loaders:[
			{
				test:/.css$/,
				loaders:['style','css'],
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
					name: 'images/[name].[hash:7].[ext]'
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

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"'
            }
        }),

        new htmlWebpackPlugin({
			title:'数据管理平台',
			chunks:['dependency','d3','build','vendors'],
			hash:true,
			template:__dirname+'/index.html',

		})
	]
}