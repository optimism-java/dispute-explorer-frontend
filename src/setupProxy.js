const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log(app);
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://144.76.97.175:8080',
      changeOrigin: true,
    })
  );
};
