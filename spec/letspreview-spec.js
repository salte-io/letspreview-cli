'use strict';

const publish = require('../src/publish');
// const unpublish = require('../src/unpublish');
const log = require('../src/log');

describe('letspreview publish', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  it('should return unauthorized error message when the user passes an invalid api key.', (done) => {
    publish('hello', 'invalid-key', null, log.LOG_LEVEL.VERBOSE).then(() => {
      fail();
      done();
    }).catch((error) => {
      expect(error.message).toMatch(/Unauthorized/);
      done();
    });
  });

  it('should return success when a valid application, api key, and directory are specified.', (done) => {
    publish('hello', process.env.key, './spec-data', log.LOG_LEVEL.VERBOSE).then(() => {
      done();
    }).catch((error) => {
      fail(error.message);
      done();
    });
  });
});

// describe('letspreview unpublish', () => {
//   jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

//   it('should return success when a valid application and api key are specified.', (done) => {
//     publish('goodbye', 'spec-data', process.env.key, log.LOG_LEVEL.VERBOSE).then(() => {
//       unpublish('goodbye', process.env.key, log.LOG_LEVEL.VERBOSE).then(() => {
//         done();
//       }).catch((error) => {
//         fail(error.message);
//         done();
//       });
//     }).catch(() => {
//       fail(error.message);
//       done();
//     });
//   });

//   it('should return an application not found error message when an invalid application name is specified.', (done) => {
//     unpublish('invalid-name', process.env.key, log.LOG_LEVEL.VERBOSE).then(() => {
//       fail();
//       done();
//     }).catch((error) => {
//       expect(error.message).toMatch(/Not Found/);
//       done();
//     });
//   });

//   it('should return an unauthorized error message when the user passes an invalid api key.', (done) => {
//     unpublish('hello', 'invalid-key', log.LOG_LEVEL.VERBOSE).then(() => {
//       fail();
//       done();
//     }).catch((error) => {
//       expect(error.message).toMatch(/Unauthorized/);
//       done();
//     });
//   });
// });
