const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/',
//     createProxyMiddleware({
//       target: 'https://v3.football.api-sports.io',
//       changeOrigin: true,
//     })
//   );
// };