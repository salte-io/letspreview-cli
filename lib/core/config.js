/**
 * @license
 * Copyright (c) 2017 The Let's Preview Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://letspreview.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://letspreview.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://letspreview.github.io/CONTRIBUTORS.txt
 * Code distributed by Salte as part of the letspreview project is also
 * subject to an additional IP rights grant found at
 * http://letspreview.github.io/PATENTS.txt
 */

module.exports = (() => {
  const API_URL = process.env.API_URL || 'https://api.letspreview.io/';
  const APP_URL_TEMPLATE = process.env.APP_URL_TEMPLATE || 'https://APP_NAME.letsprview.io/';
  const API_KEY = 'cj2i8pqwd00003k6bh9qmjiqe';

  return {
    API_URL: API_URL,
    APP_URL_TEMPLATE: APP_URL_TEMPLATE,
    API_KEY: API_KEY
  };
})();
