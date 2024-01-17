const {defineConfig} = require('@vue/cli-service')
module.exports = {
  devServer: {
    port: 8082,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true
    //   }
    // }
  },
};