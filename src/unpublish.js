'use strict';

const config = require('./config');
const log = require('./log');
const fetch = require('./fetch');
const chalk = require('chalk');

module.exports = (applicationName, apiKey, verboseFlag) => {
  return new Promise((resolve, reject) => {
    log.setCurrentLevel(verboseFlag);
    let url = `${config.API_URL}unpublish/${applicationName}`;
    log.write(chalk.white(`Removing ${applicationName} via ${url}...`), log.LOG_LEVEL.VERBOSE);
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `token ${apiKey}`
        }
    }).then((res) => {
      log.writeLine(chalk.green('COMPLETE'), log.LOG_LEVEL.VERBOSE);
      if (res.status === 200 && res.statusText === 'OK') {
        log.writeLine(chalk.green(`The application ${applicationName} was successfully removed from ${config.APP_URL_TEMPLATE.replace('APP_NAME', applicationName)}`), log.LOG_LEVEL.NORMAL);
        resolve();
      } else {
        log.writeLine(chalk.red(`An unexpected response was received from the server: ${res.statusText}`), log.LOG_LEVEL.ERROR);
        reject(new Error(res.statusText));
      }
    }).catch((error) => {
      console.log(JSON.stringify(error));
      let message = error.response && error.response.statusText ? error.response.statusText : error;
      log.writeLine(chalk.red(`Unable to remove the application ${applicationName}: ${message}`), log.LOG_LEVEL.ERROR);
      reject(new Error(message));
    });
  });
};
