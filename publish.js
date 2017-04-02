const config = require('./config');
const log = require('./log');
const fs = require('fs');
const targz = require('tar.gz');
const uuid = require('uuid');
const FormData = require('form-data');
const fetch = require('./fetch');
const os = require('os');

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
  log.setCurrentLevel(argv.verbose ? log.LOG_LEVEL.VERBOSE : argv.quiet ? log.LOG_LEVEL.SILENT : log.LOG_LEVEL.NORMAL);
  console.log(os.tmpdir());
  if ((argv.directory && __dirname !== argv.directory) || __dirname !== process.cwd()) {
    // Create Archive
    let directory = argv.directory ? argv.directory : process.cwd();
    let filename = `${uuid.v4()}.tar.gz`;
    let read = targz().createReadStream(directory);
    let write = fs.createWriteStream(filename);
    read.pipe(write);

    write.on('finish', function() {
            console.log('done writing file');
      let form = new FormData();
      form.append('file', fs.createReadStream(filename), {
          filename: filename,
          contentType: 'application/zip'
      });

      let url = `${config.API_URL}publish/${argv.name}`;
      console.log(`url: ${url}`);
      return fetch(url, {
          method: 'POST',
          body: form,
          headers: {
              'Authorization': `token ${argv.key}`
          }
      }).then((res) => {
        if (res.status === 200 && res.statusText === 'OK') {
          log.write(`The contents of ${directory} were successfully uploaded to ${config.APP_URL_TEMPLATE.replace('APP_NAME', rgv.name)}.`, log.LOG_LEVEL.NORMAL);
        } else {
          log.write(`An unexpected response was received from the server: ${res.statusText}.`, log.LOG_LEVEL.ERROR);
        }
        fs.unlinkSync(path);
      }).catch((error) => {
        let message = error.response && error.response.statusText ? error.response.statusText : error;
        log.write(`Unable to upload the contents of ${directory}: ${message}.`, log.LOG_LEVEL.ERROR);
      });
    });
  } else {
    log.write('You cannot compress the directory where the currently executing script exists!', log.LOG_LEVEL.ERROR);
  }
};
