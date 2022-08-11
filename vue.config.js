const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置端口号
  devServer: { // dev 开发 server 服务
    host: '127.0.0.1',
    port: 3000,
    open: true // 默认浏览器自己开启页面
  },
  lintOnSave: false // eslint 校验 on Save: 当代码报错的时候
})
