const { defineConfig } = require('@vue/cli-service')
const { VuetifyPlugin } = require('webpack-plugin-vuetify')

module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:8585', // Replace with the URL of your Express server
				changeOrigin: true,
				ws: true,
				secure: false,
				pathRewrite: {
					'^/api': '',
				},
				onProxyReq(proxyReq) {
					proxyReq.setHeader('Origin', 'http://localhost:8080'); // Replace with the URL of your Vue development server
				},
			},
		},
	},
	configureWebpack: {
		plugins: [
			new VuetifyPlugin({ autoImport: true }), // Enabled by default
		],
		optimization: {
			runtimeChunk: 'single',
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: Infinity,
				minSize: 0,
				cacheGroups: {
					/* vendor: {
						test: /[\\/]node_modules[\\/]/,
						name(module) {
							// Get the name after the last slash in the module resource path
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
							return `npm.${packageName.replace('@', '')}`;
						},
					}, */
				},
			},
		},
	}
})
