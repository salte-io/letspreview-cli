'use strict';

const log = require('../core/log');
const chalk = require('chalk');
const unpublish = require('../core/unpublish');

exports.command = 'unpublish <name> [options]';

exports.describe = 'Removes the application from letspreview.io.';

exports.builder = function(yargs) {
  return yargs.option('k', {
    alias: 'key',
    describe: 'The api key used to unpublish the application.',
    type: 'string'
  }).demandOption('key');
};

exports.handler = function(argv) {
  let verboseFlag = argv.verbose ? log.LOG_LEVEL.VERBOSE : argv.quiet ? log.LOG_LEVEL.SILENT : log.LOG_LEVEL.NORMAL;
  log.setCurrentLevel(verboseFlag);
  log.writeLine(chalk.white('==============================================================================='), log.LOG_LEVEL.VERBOSE);
  log.writeLine(chalk.white(`= Unublishing ${argv.name}`), log.LOG_LEVEL.VERBOSE);
  log.writeLine(chalk.white('==============================================================================='), log.LOG_LEVEL.VERBOSE);
  unpublish(argv.name, argv.key, verboseFlag).then(() => {
    log.writeLine(chalk.white('==============================================================================='), log.LOG_LEVEL.VERBOSE);
    log.writeLine(chalk.white(`= Finished Unpublishing ${argv.name}`), log.LOG_LEVEL.VERBOSE);
    log.writeLine(chalk.white('==============================================================================='), log.LOG_LEVEL.VERBOSE);
  }).catch((error) => {
    log.writeLine(chalk.red('==============================================================================='), log.LOG_LEVEL.ERROR);
    log.writeLine(chalk.red(`= Unable to Unpublish ${argv.name}: ${error.message}`), log.LOG_LEVEL.ERROR);
    log.writeLine(chalk.red('==============================================================================='), log.LOG_LEVEL.ERROR);
  });
};
