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
const fs = require('fs');
const os = require('os');
const path = require('path');
const targz = require('tar.gz');
const uuid = require('uuid');
const FormData = require('form-data');
const config = require('../config.js');
const fetch = require('../fetch.js');

/**
 * Publishes an application to "Let's Preview!"
 *
 * @param {string} applicationName The application name
 * @param {string} apiKey The application name
 * @param {string} directory The application name
 * @return {Promise} a promise that resolves when the app is published
 */
function publish(applicationName, apiKey, directory) {
  return new Promise((resolve, reject) => {
    directory = directory ? directory : process.cwd();
    // Create Archive
    const temp = os.tmpdir().endsWith(path.sep) ? os.tmpdir() : os.tmpdir().concat(path.sep);
    const filename = `${uuid.v4()}.tar.gz`;
    const fullPath = temp.concat(filename);
    const read = targz({}, {fromBase: true}).createReadStream(directory);
    const write = fs.createWriteStream(fullPath);
    read.pipe(write);

    write.on('error', (error) => {
      reject(error);
    });
    // Upload Archive
    write.on('finish', () => {
      resolve({
        path: temp,
        filename,
        fullPath
      });
    });
  }).then((location) => {
    const form = new FormData();
    form.append('file', fs.createReadStream(location.fullPath), {
        filename: location.filename,
        contentType: 'application/zip'
    });

    const endpoint = urljoin(config.LETS_PREVIEW_ENDPOINT, 'publish', applicationName);
    return fetch(endpoint, {
        method: 'POST',
        body: form,
        headers: {
            'Authorization': `token ${apiKey}`
        }
    }).then((res) => {
      fs.unlinkSync(location.fullPath);
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
    }).catch((error) => {
      fs.unlinkSync(location.fullPath);
      throw new Error(error.message);
    });
  });
}

module.exports = publish;
