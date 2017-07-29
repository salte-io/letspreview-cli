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

const execFile = require('child_process').execFile;
const config = require('../lib/core/config');

describe('letspreview', () => {
  it('should return the full help message when the user fails to pass a command to execute.', (done) => {
    execFile('node', ['index'], (error, stdout, stderr) => {
      expect(stdout).toBeFalsy();
      expect(stderr.replace(/\s|\r?\n|\r/g, '')).toEqual('index<cmd><name>[options]Commands:publish<name>[options]Pushestheapplicationtoletspreview.io.unpublish<name>[options]Removestheapplicationfromletspreview.io.GlobalOptions-v,--verboseDisplayDebuggingOutput[boolean]-h,--helpShowHelp[boolean]-q,--quietSuppressOutput[boolean]Youmustspecifyacommandtoexecute.');
      done();
    });
  });
});

describe('letspreview publish', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  it('should return a missing argument error message when the user neglects to provide an application name.', (done) => {
    execFile('node', ['index', 'publish'], (error, stdout, stderr) => {
      expect(stdout).toBeFalsy();
      expect(stderr).toMatch(/Not enough non-option arguments: got 0, need at least 1/);
      done();
    });
  });

  it('should return a missing key error message when the user neglects to provide an api key.', (done) => {
    execFile('node', ['index', 'publish', 'hello'], (error, stdout, stderr) => {
      expect(stdout).toBeFalsy();
      expect(stderr).toMatch(/Missing required argument: key/);
      done();
    });
  });

  it('should return an unauthorized error message when the user passes an invalid api key.', (done) => {
    execFile('node', ['index', 'publish', 'hello', '-k', 'invalid-key'], (error, stdout, stderr) => {
      expect(stderr).toBeFalsy();
      expect(stdout).toMatch(/Unauthorized/);
      done();
    });
  });
});

describe('letspreview unpublish', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  it('should return a missing argument error message when the user neglects to provide an application name.', (done) => { // eslint-disable-line jasmine/no-spec-dupes
    execFile('node', ['index', 'unpublish', '-k', config.API_KEY], (error, stdout, stderr) => {
      expect(stdout).toBeFalsy();
      expect(stderr).toMatch(/Not enough non-option arguments: got 0, need at least 1/);
      done();
    });
  });

  it('should return a missing argument error message when an invalid application name is passed.', (done) => { // eslint-disable-line jasmine/no-spec-dupes
    execFile('node', ['index', 'unpublish', 'invalid-name', '-k', config.API_KEY], (error, stdout, stderr) => {
      expect(stderr).toBeFalsy();
      expect(stdout).toMatch(/Unable to remove the application invalid-name: Not Found/);
      done();
    });
  });

  it('should return a missing key error message when the user neglects to provide an api key.', (done) => { // eslint-disable-line jasmine/no-spec-dupes
    execFile('node', ['index', 'unpublish', 'hello'], (error, stdout, stderr) => {
      expect(stdout).toBeFalsy();
      expect(stderr).toMatch(/Missing required argument: key/);
      done();
    });
  });

  it('should return an unauthorized error message when the user passes an invalid api key.', (done) => { // eslint-disable-line jasmine/no-spec-dupes
    execFile('node', ['index', 'unpublish', 'hello', '-k', 'invalid-key'], (error, stdout, stderr) => {
      expect(stderr).toBeFalsy();
      expect(stdout).toMatch(/Unauthorized/);
      done();
    });
  });
});
