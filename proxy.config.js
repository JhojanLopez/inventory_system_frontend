const PROXY_CONFIG = [
  {
    context: [
      '/users-service/',
      '/merchandise-service/'
    ],
    target: 'http://localhost:8090',
    secure: false,
    changeOrigin: true
  }
];

module.exports = PROXY_CONFIG;