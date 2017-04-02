const config = require('./config');
const log = require('./log');

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
  log.setCurrentLevel(argv.verbose ? log.LOG_LEVEL.VERBOSE : argv.quiet ? log.LOG_LEVEL.SILENT : log.LOG_LEVEL.NORMAL);
  log.write('UNPUBLISH CALLED: SILENT', log.LOG_LEVEL.SILENT);
  log.write('UNPUBLISH CALLED: NORMAL', log.LOG_LEVEL.NORMAL);
  log.write('UNPUBLISH CALLED: VERBOSE', log.LOG_LEVEL.VERBOSE);
};
