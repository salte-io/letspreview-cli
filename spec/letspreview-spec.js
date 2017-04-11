'use strict';

const path = require('path');
const pact = require('pact');
const execFile = require('child_process').execFile;
const MOCK_SERVER_PORT = 1234;
const provider = pact({
  consumer: 'Let\'s PReview CLI',
  provider: 'Let\'s PReview API',
  port: MOCK_SERVER_PORT,
  log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: process.env.LOG_LEVEL || 'WARN',
  spec: 2
});
process.env.API_URL = `http://localhost:${MOCK_SERVER_PORT}/`;

// Alias flexible matchers for simplicity
// const term = pact.Matchers.term;
// const like = pact.Matchers.somethingLike;
// const eachLike = pact.Matchers.eachLike;

describe('letspreview', () => {
  it('should return the full help message when the user fails to pass a command to execute.', (done) => {
    execFile('node', ['letspreview'], (error, stdout, stderr) => {
      expect(stdout).toBeFalsy();
      expect(stderr.replace(/\s|\r?\n|\r/g, '')).toEqual('letspreview<cmd><name>[options]Commands:publish<name>[options]Pushestheapplicationtoletspreview.io.unpublish<name>[options]Removestheapplicationfromletspreview.io.GlobalOptions-v,--verboseDisplayDebuggingOutput[boolean]-h,--helpShowHelp[boolean]-q,--quietSuppressOutput[boolean]Youmustspecifyacommandtoexecute.');
      done();
    });
  });
});

describe('letspreview publish', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  beforeAll((done) => {
    return provider.setup()
      .then(() => {
        provider.addInteraction({
          state: 'Unauthorized',
          uponReceiving: 'a request with an invalid API key',
          withRequest: {
            method: 'POST',
            path: '/publish/hello',
            headers: {
              'Authorization': 'token invalid-key'
            }
          },
          willRespondWith: {
            status: 401,
            body: 'Unauthorized'
          }
        });
        console.log('interaction one added');
      })
      .then(() => {
        provider.addInteraction({
          state: 'Successful Publish',
          uponReceiving: 'a request with a valid API key',
          withRequest: {
            method: 'POST',
            path: '/publish/hello',
            headers: {
              'Authorization': `token ${process.env.key}`
            }
          },
          willRespondWith: {
            status: 200,
            body: 'The contents of spec-data were successfully uploaded and may be accessed via https://hello.letsprview.io/'
          }
        });
        console.log('interaction two added');
      })
      .then(() => {
        console.log('calling done');
        done();
      })
      .catch((e) => {
        console.log('ERROR: ', e);
      });
  });

  afterAll(() => {
    provider.finalize();
  });

  it('should return a missing argument error message when the user neglects to provide an application name.', (done) => {
    execFile('node', ['letspreview', 'publish'], (error, stdout, stderr) => {
      expect(stdout).toBeFalsy();
      expect(stderr).toMatch(/Not enough non-option arguments: got 0, need at least 1/);
      done();
    });
  });

  it('should return a missing key error message when the user neglects to provide an api key.', (done) => {
    execFile('node', ['letspreview', 'publish', 'hello'], (error, stdout, stderr) => {
      expect(stdout).toBeFalsy();
      expect(stderr).toMatch(/Missing required argument: key/);
      done();
    });
  });

  it('should return an unauthorized error message when the user passes an invalid api key.', (done) => {
    execFile('node', ['letspreview', 'publish', 'hello', '-k', 'invalid-key'], (error, stdout, stderr) => {
      expect(stderr).toBeFalsy();
      expect(stdout).toMatch(/Unauthorized/);
      done();
    });
  });

  it('should return success when a correctly formatted publish command, including source directory, is passed.', (done) => {
    execFile('node', ['letspreview', 'publish', 'hello', '-k', process.env.key, '-d', 'spec-data'], (error, stdout, stderr) => {
      expect(stderr).toBeFalsy();
      expect(stdout).toMatch('The contents of spec-data were successfully uploaded and may be accessed via https://hello.letsprview.io/');
      done();
    });
  });

  it('creates a contract between the Let\'s PReview API and Let\'s PReview CLI', () => {
    return provider.verify();
  });
});

// describe('letspreview unpublish', () => {
//   jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

//   it('should return success when a correctly formatted unpublish command is passed.', (done) => {
//     execFile('node', ['letspreview', 'unpublish', 'hello', '-k', process.env.key], (error, stdout, stderr) => {
//       expect(stderr).toBeFalsy();
//       expect(stdout).toMatch('The application hello was successfully removed from https://hello.letsprview.io/');
//       done();
//     });
//   });

//   it('should return a missing argument error message when the user neglects to provide an application name.', (done) => { // eslint-disable-line jasmine/no-spec-dupes
//     execFile('node', ['letspreview', 'unpublish', '-k', process.env.key], (error, stdout, stderr) => {
//       expect(stdout).toBeFalsy();
//       expect(stderr).toMatch(/Not enough non-option arguments: got 0, need at least 1/);
//       done();
//     });
//   });

//   it('should return a missing argument error message when an invalid application name is passed.', (done) => { // eslint-disable-line jasmine/no-spec-dupes
//     execFile('node', ['letspreview', 'unpublish', 'invalid-name', '-k', process.env.key], (error, stdout, stderr) => {
//       expect(stderr).toBeFalsy();
//       expect(stdout).toMatch(/Unable to remove the application invalid-name: Not Found/);
//       done();
//     });
//   });

//   it('should return a missing key error message when the user neglects to provide an api key.', (done) => { // eslint-disable-line jasmine/no-spec-dupes
//     execFile('node', ['letspreview', 'unpublish', 'hello'], (error, stdout, stderr) => {
//       expect(stdout).toBeFalsy();
//       expect(stderr).toMatch(/Missing required argument: key/);
//       done();
//     });
//   });

//   it('should return an unauthorized error message when the user passes an invalid api key.', (done) => { // eslint-disable-line jasmine/no-spec-dupes
//     execFile('node', ['letspreview', 'unpublish', 'hello', '-k', 'invalid-key'], (error, stdout, stderr) => {
//       expect(stderr).toBeFalsy();
//       expect(stdout).toMatch(/Unauthorized/);
//       done();
//     });
//   });
// });
