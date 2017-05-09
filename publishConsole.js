'use strict';

const log = require('./core/log');
const chalk = require('chalk');
const publish = require('./core/publish');

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
  });
};
