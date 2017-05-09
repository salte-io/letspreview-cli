'use strict';

const publish = require('../core/publish');
const unpublish = require('../core/unpublish');
const log = require('../core/log');
const utils = require('../core/utils');

describe('letspreview publish', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

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
    publish(appName, process.env.key, './spec-data', log.LOG_LEVEL.VERBOSE).then(() => {
      unpublish(appName, process.env.key, log.LOG_LEVEL.VERBOSE).then(() => {
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
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  it('should return success when a valid application and api key are specified.', (done) => {
    let appName = utils.generateName(5);
    publish(appName, process.env.key, './spec-data', log.LOG_LEVEL.VERBOSE).then(() => {
      unpublish(appName, process.env.key, log.LOG_LEVEL.VERBOSE).then(() => {
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
    unpublish(appName, process.env.key, log.LOG_LEVEL.VERBOSE).then(() => {
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
