import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app) {
  app.use(
    '/fixtures',
    createProxyMiddleware({
      target: 'https://v3.football.api-sports.io',
      changeOrigin: true,
    })
  );

  app.use(
    '/fixtures/events',
    createProxyMiddleware({
      target: 'https://v3.football.api-sports.io',
      changeOrigin: true,
    })
  );

  app.use(
  '/fixtures/lineups',
    createProxyMiddleware({
      target: 'https://v3.football.api-sports.io',
      changeOrigin: true,
    })
  );

  app.use(
    '/fixtures/statistics',
      createProxyMiddleware({
        target: 'https://v3.football.api-sports.io',
        changeOrigin: true,
      })
    );

  app.use(
    '/fixtures/players',
      createProxyMiddleware({
        target: 'https://v3.football.api-sports.io',
        changeOrigin: true,
      })
      );
    
  app.use('/')
};