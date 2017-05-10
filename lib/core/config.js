'use strict';

module.exports = (() => {
  const API_URL = process.env.API_URL || 'https://api.letspreview.io/';
  const APP_URL_TEMPLATE = 'https://APP_NAME.letsprview.io/';
  const API_KEY = 'cj2i8pqwd00003k6bh9qmjiqe';

  return {
    API_URL: API_URL,
    APP_URL_TEMPLATE: APP_URL_TEMPLATE,
    API_KEY: API_KEY
  };
})();
