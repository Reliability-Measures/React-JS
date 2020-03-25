const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    'C:\Users\Windows\Desktop\MainPythonCode\STD',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5000/',
      changeOrigin: true,
    })
  );
};