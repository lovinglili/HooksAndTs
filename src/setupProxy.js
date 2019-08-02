const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { 
    target: 'http://188.131.191.92',
    changeOrigin: true,  //是否跨域
    pathRewrite: {
      '^/api': ''   //重写接口
    }
  }));
};