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

const publish = require('../lib/core/publish');
const unpublish = require('../lib/core/unpublish');
const log = require('../lib/core/log');
const utils = require('../lib/core/utils');
const config = require('../lib/core/config');

describe('letspreview publish', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;

  it('should return unauthorized error message when the user passes an invalid api key.', (done) => {
    let appName = utils.generateName(3);
    publish(appName, 'invalid-key', null, log.LOG_LEVEL.VERBOSE).then(() => {
      fail();
      done();
    }).catch((error) => {
      expect(error.message).toMatch(/Unauthorized/);
      done();
    });
  });

  it('should return success when a valid application, api key, and directory are specified.', (done) => {
    let appName = utils.generateName(4);
    publish(appName, config.API_KEY, './spec-data', log.LOG_LEVEL.VERBOSE).then(() => {
      unpublish(appName, config.API_KEY, log.LOG_LEVEL.VERBOSE).then(() => {
        done();
      }).catch((error) => {
        log.writeLine(`Unable to remove test application ${appName}: ${error.message}`, log.LOG_LEVEL.ERROR);
        done();
      });
    }).catch((error) => {
      fail(error.message);
      done();
    });
  });
});

describe('letspreview unpublish', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;

  it('should return success when a valid application and api key are specified.', (done) => {
    let appName = utils.generateName(5);
    publish(appName, config.API_KEY, './spec-data', log.LOG_LEVEL.VERBOSE).then(() => {
      unpublish(appName, config.API_KEY, log.LOG_LEVEL.VERBOSE).then(() => {
        done();
      }).catch((error) => {
        fail(error.message);
        done();
      });
    }).catch(() => {
      fail(error.message);
      done();
    });
  });

  it('should return an application not found error message when an invalid application name is specified.', (done) => {
    let appName = utils.generateName(6);
    unpublish(appName, config.API_KEY, log.LOG_LEVEL.VERBOSE).then(() => {
      fail();
      done();
    }).catch((error) => {
      expect(error.message).toMatch(/Not Found/);
      done();
    });
  });

  it('should return an unauthorized error message when the user passes an invalid api key.', (done) => {
    let appName = utils.generateName(7);
    unpublish(appName, 'invalid-key', log.LOG_LEVEL.VERBOSE).then(() => {
      fail();
      done();
    }).catch((error) => {
      expect(error.message).toMatch(/Unauthorized/);
      done();
    });
  });
});
