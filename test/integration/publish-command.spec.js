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

const path = require('path');
const exec = require('child-process-promise').exec;
const expect = require('chai').expect;

describe('command(publish)', () => {
  it('should return a missing argument error message when the user neglects to provide an application name.', () => {
    return exec(`node ${path.resolve('bin/letspreview.js')} publish`).then(() => {
      return 'Allowed to pass an invalid number of arguments!';
    }).catch((result) => {
      expect(result.stdout).to.equal('');
      expect(result.stderr).to.match(/Not enough non-option arguments: got 0, need at least 1/);
      expect(result.code).to.equal(1);
    }).then((error) => {
      if (error) throw error;
    });
  });

  it('should return a missing key error message when the user neglects to provide an api key.', () => {
    return exec(`node ${path.resolve('bin/letspreview.js')} publish hello`).then(() => {
      return 'Invalid key was allowed!';
    }).catch((result) => {
      expect(result.stdout).to.equal('');
      expect(result.stderr).to.match(/Missing required argument: key/);
      expect(result.code).to.equal(1);
    }).then((error) => {
      if (error) throw error;
    });
  });

  it('should return an unauthorized error message when the user passes an invalid api key.', () => {
    return exec(`node ${path.resolve('bin/letspreview.js')} publish hello -k invalid-key -d test/.mock-app`).then(() => {
      return 'Invalid key was allowed!';
    }).catch((result) => {
      expect(result.stdout).to.equal('');
      expect(result.stderr).to.match(/Invalid API KEY/);
      expect(result.code).to.equal(1);
    }).then((error) => {
      if (error) throw error;
    });
  });
});
