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
      splitChunks: {
        chunks: 'all'
      }
    },
    devtool: 'source-map'

  }
})
