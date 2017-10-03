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

describe('command(help)', () => {
  it('should return the full help message when the user fails to pass a command to execute.', () => {
    return exec(`node ${path.resolve('bin/letspreview.js')}`).then(() => {
      return 'Help was not presented to the user!';
    }).catch((result) => {
      expect(result.stdout).to.equal('');
      expect(result.stderr).to.match(/Commands:/);
    }).then((error) => {
      if (error) throw error;
    });
  });
});
