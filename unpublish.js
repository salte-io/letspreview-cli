const config = require('./config');
const log = require('./log');
const fetch = require('./fetch');
const chalk = require('chalk');

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
  log.writeLine(chalk.white('==============================================================================='), log.LOG_LEVEL.VERBOSE);
  log.writeLine(chalk.white(`= Unublishing ${argv.name}`), log.LOG_LEVEL.VERBOSE);
  log.writeLine(chalk.white('==============================================================================='), log.LOG_LEVEL.VERBOSE);
  let finished = () => {
    log.writeLine(chalk.white('==============================================================================='), log.LOG_LEVEL.VERBOSE);
    log.writeLine(chalk.white(`= Finished Unpublishing ${argv.name}`), log.LOG_LEVEL.VERBOSE);
    log.writeLine(chalk.white('==============================================================================='), log.LOG_LEVEL.VERBOSE);
  };

  let url = `${config.API_URL}unpublish/${argv.name}`;
  log.write(chalk.white(`Removing ${argv.name} via ${url}...`), log.LOG_LEVEL.VERBOSE);
  return fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `token ${argv.key}`
      }
  }).then((res) => {
    log.writeLine(chalk.green('COMPLETE'), log.LOG_LEVEL.VERBOSE);
    if (res.status === 200 && res.statusText === 'OK') {
      log.writeLine(chalk.green(`The application ${argv.name} was successfully removed from ${config.APP_URL_TEMPLATE.replace('APP_NAME', argv.name)}`), log.LOG_LEVEL.NORMAL);
    } else {
      log.writeLine(chalk.red(`An unexpected response was received from the server: ${res.statusText}`), log.LOG_LEVEL.ERROR);
    }
    finished();
  }).catch((error) => {
    let message = error.response && error.response.statusText ? error.response.statusText : error;
    log.writeLine(chalk.red(`Unable to remove the application ${argv.name}: ${message}`), log.LOG_LEVEL.ERROR);
    finished();
  });
};
