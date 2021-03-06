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

const fetch = require('node-fetch');

module.exports = (input, options) => {
  return fetch.call(this, input, options).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const promise = response.headers.get('content-type').indexOf('application/json') === -1 ? response.text() : response.json();
    return promise.then((content) => {
      const error = new Error(content && content.message || content);
      error.message = content && content.message;
      error.response = response;
      throw error;
    });
  });
};
