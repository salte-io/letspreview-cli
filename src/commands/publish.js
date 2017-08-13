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
const publish = require('../publish/publish.js');

exports.command = 'publish <name>';
exports.describe = 'Pushes the application to letspreview.io.';

exports.builder = (yargs) => {
  return yargs.option('k', {
      alias: 'key',
      describe: 'The api key used to publish the application.',
      type: 'string'
  }).option('d', {
      alias: 'directory',
      describe: 'The application source directory.',
      type: 'string'
  }).demandOption('key');
};

exports.handler = (argv) => {
  logger.verbose(`Publishing ${argv.name}...`);
  publish(argv.name, argv.key, argv.directory).then(() => {
    logger.info('App was published successfully!');
  }).catch((error) => {
    logger.error('Failed to publish app!');
    throw error;
  });
};
