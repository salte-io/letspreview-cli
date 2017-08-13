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

const urljoin = require('urljoin');
const config = require('../config.js');
const fetch = require('../fetch.js');

/**
 * Unpublishes an application to "Let's Preview!"
 *
 * @param {string} applicationName The application name
 * @param {string} apiKey The application name
 * @return {Promise} a promise that resolves when the app is unpublished
 */
function unpublish(applicationName, apiKey) {
  const endpoint = urljoin(config.LETS_PREVIEW_ENDPOINT, 'unpublish', applicationName);
  return fetch(endpoint, {
      method: 'DELETE',
      headers: {
          'Authorization': `token ${apiKey}`
      }
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
  }).catch((error) => {
    throw new Error(error.message);
  });
};

module.exports = unpublish;
