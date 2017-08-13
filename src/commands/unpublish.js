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

const logger = require('../logger.js');
const unpublish = require('../unpublish/unpublish.js');

exports.command = 'unpublish <name>';
exports.describe = 'Removes the application from letspreview.io.';

exports.builder = (yargs) => {
  return yargs.option('k', {
    alias: 'key',
    describe: 'The api key used to unpublish the application.',
    type: 'string'
  }).demandOption('key');
};

exports.handler = (argv) => {
  logger.verbose(`Unpublishing ${argv.key}...`);
  unpublish(argv.name, argv.key).then(() => {
    logger.info('App was unpublished successfully!');
  }).catch((error) => {
    logger.error('Failed to unpublish app!');
    throw error;
  });
};
