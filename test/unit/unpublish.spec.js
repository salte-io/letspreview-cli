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

const expect = require('chai').expect;
const Moniker = require('moniker');
const publish = require('../../src/publish/publish');
const unpublish = require('../../src/unpublish/unpublish.js');
const config = require('../../src/config.js');

describe('function(unpublish)', () => {
  it('should return success when a valid application and api key are specified.', () => {
    const appName = Moniker.choose();
    return publish(appName, config.LETS_PREVIEW_API_KEY, 'test/.mock-app').then(() => {
      return unpublish(appName, config.LETS_PREVIEW_API_KEY);
    });
  });

  it('should return an application not found error message when an invalid application name is specified.', () => {
    const appName = Moniker.choose();
    return unpublish(appName, config.LETS_PREVIEW_API_KEY).then(() => {
      return 'Expected application to not be found!';
    }).catch((error) => {
      expect(error.message).to.match(/does not exist/);
    }).then((error) => {
      if (error) throw error;
    });
  });

  it('should return an unauthorized error message when the user passes an invalid api key.', () => {
    const appName = Moniker.choose();
    return unpublish(appName, 'invalid-key').then(() => {
      return 'Invalid key was allowed!';
    }).catch((error) => {
      expect(error.message).to.match(/Invalid API KEY/);
    }).then((error) => {
      if (error) throw error;
    });
  });
});
