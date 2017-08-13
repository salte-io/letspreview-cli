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

const config = {
  LETS_PREVIEW_ENDPOINT: process.env.LETS_PREVIEW_ENDPOINT || 'https://api.letspreview.io',
  LETS_PREVIEW_API_KEY: process.env.LETS_PREVIEW_API_KEY || 'cj69vm9m800003c5a59adv6rz'
};

module.exports = config;
