'use strict';

const execFile = require('child_process').execFile;

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
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

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
});

describe('letspreview unpublish', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  it('should return success when a correctly formatted unpublish command is passed.', (done) => {
    execFile('node', ['letspreview', 'unpublish', 'hello', '-k', process.env.key], (error, stdout, stderr) => {
      expect(stderr).toBeFalsy();
      expect(stdout).toMatch('The application hello was successfully removed from https://hello.letsprview.io/');
      done();
    });
  });

  it('should return a missing argument error message when the user neglects to provide an application name.', (done) => { // eslint-disable-line jasmine/no-spec-dupes
    execFile('node', ['letspreview', 'unpublish', '-k', process.env.key], (error, stdout, stderr) => {
      expect(stdout).toBeFalsy();
      expect(stderr).toMatch(/Not enough non-option arguments: got 0, need at least 1/);
      done();
    });
  });

  it('should return a missing argument error message when an invalid application name is passed.', (done) => { // eslint-disable-line jasmine/no-spec-dupes
    execFile('node', ['letspreview', 'unpublish', 'invalid-name', '-k', process.env.key], (error, stdout, stderr) => {
      expect(stderr).toBeFalsy();
      expect(stdout).toMatch(/Unable to remove the application invalid-name: Not Found/);
      done();
    });
  });

  it('should return a missing key error message when the user neglects to provide an api key.', (done) => { // eslint-disable-line jasmine/no-spec-dupes
    execFile('node', ['letspreview', 'unpublish', 'hello'], (error, stdout, stderr) => {
      expect(stdout).toBeFalsy();
      expect(stderr).toMatch(/Missing required argument: key/);
      done();
    });
  });

  it('should return an unauthorized error message when the user passes an invalid api key.', (done) => { // eslint-disable-line jasmine/no-spec-dupes
    execFile('node', ['letspreview', 'unpublish', 'hello', '-k', 'invalid-key'], (error, stdout, stderr) => {
      expect(stderr).toBeFalsy();
      expect(stdout).toMatch(/Unauthorized/);
      done();
    });
  });
});
