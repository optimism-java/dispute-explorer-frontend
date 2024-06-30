const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/index',
    createProxyMiddleware({
      target: 'http://144.76.97.175:7700',
      // changeOrigin: true,
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://144.76.97.175:8080',
      // changeOrigin: true,
    })
  );
};
