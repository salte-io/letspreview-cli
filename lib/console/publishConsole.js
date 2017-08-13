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

const log = require('../core/log');
const chalk = require('chalk');
const publish = require('../core/publish');

exports.command = 'publish <name> [options]';

exports.describe = 'Pushes the application to letspreview.io.';

exports.builder = function(yargs) {
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

exports.handler = function(argv) {
  let verboseFlag = argv.verbose ? log.LOG_LEVEL.VERBOSE : argv.quiet ? log.LOG_LEVEL.SILENT : log.LOG_LEVEL.NORMAL;
  log.setCurrentLevel(verboseFlag);
  log.writeLine(chalk.white('==============================================================================='), log.LOG_LEVEL.VERBOSE);
  log.writeLine(chalk.white(`= Publishing ${argv.name}`), log.LOG_LEVEL.VERBOSE);
  log.writeLine(chalk.white('==============================================================================='), log.LOG_LEVEL.VERBOSE);
  publish(argv.name, argv.key, argv.directory, verboseFlag).then(() => {
    log.writeLine(chalk.white('==============================================================================='), log.LOG_LEVEL.VERBOSE);
    log.writeLine(chalk.white(`= Finished Publishing ${argv.name}`), log.LOG_LEVEL.VERBOSE);
    log.writeLine(chalk.white('==============================================================================='), log.LOG_LEVEL.VERBOSE);
  }).catch((error) => {
    log.writeLine(chalk.red('==============================================================================='), log.LOG_LEVEL.ERROR);
    log.writeLine(chalk.red(`= Unable to Publish ${argv.name}: ${error.message}`), log.LOG_LEVEL.ERROR);
    log.writeLine(chalk.red('==============================================================================='), log.LOG_LEVEL.ERROR);
    process.exit(1);
  });
};
