'use strict';

const config = require('./config');
const log = require('./log');
const fs = require('fs');
const targz = require('tar.gz');
const uuid = require('uuid');
const FormData = require('form-data');
const fetch = require('./fetch');
const os = require('os');
const path = require('path');
const chalk = require('chalk');

module.exports = (applicationName, apiKey, directory, verboseFlag) => {
  return new Promise((resolve, reject) => {
    log.setCurrentLevel(verboseFlag);
    directory = directory ? directory : process.cwd();
    // Create Archive
    let temp = os.tmpdir().endsWith(path.sep) ? os.tmpdir() : os.tmpdir().concat(path.sep);
    let filename = `${uuid.v4()}.tar.gz`;
    log.write(chalk.white(`Archiving ${directory} to ${temp.concat(filename)}...`), log.LOG_LEVEL.VERBOSE);
    let read = targz({}, {fromBase: true}).createReadStream(directory);
    let write = fs.createWriteStream(temp.concat(filename));
    read.pipe(write);

    // Upload Archive
    write.on('finish', function() {
      log.writeLine(chalk.green('COMPLETE'), log.LOG_LEVEL.VERBOSE);
      let form = new FormData();
      form.append('file', fs.createReadStream(temp.concat(filename)), {
          filename: filename,
          contentType: 'application/zip'
      });

      let url = `${config.API_URL}publish/${applicationName}`;
      log.write(chalk.white(`Uploading Archive to ${url}...`), log.LOG_LEVEL.VERBOSE);
      return fetch(url, {
          method: 'POST',
          body: form,
          headers: {
              'Authorization': `token ${apiKey}`
          }
      }).then((res) => {
        log.writeLine(chalk.green('COMPLETE'), log.LOG_LEVEL.VERBOSE);
        if (res.status === 200 && res.statusText === 'OK') {
          log.writeLine(chalk.green(`The contents of ${directory} were successfully uploaded and may be accessed via ${config.APP_URL_TEMPLATE.replace('APP_NAME', applicationName)}`), log.LOG_LEVEL.NORMAL);
          fs.unlinkSync(temp.concat(filename));
          resolve();
        } else {
          log.writeLine(chalk.red(`An unexpected response was received from the server: ${res.statusText}`), log.LOG_LEVEL.ERROR);
          fs.unlinkSync(temp.concat(filename));
          reject(new Error(res.statusText));
        }
      }).catch((error) => {
        let message = error.response && error.response.statusText ? error.response.statusText : error;
        log.writeLine(chalk.red(`Unable to upload the contents of ${directory}: ${message}`), log.LOG_LEVEL.ERROR);
        fs.unlinkSync(temp.concat(filename));
        reject(new Error(message));
      });
    });
  });
};
