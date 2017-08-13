const args = require('yargs').argv;

let LOG_LEVEL = 'info';
if (args.verbose) {
  LOG_LEVEL = 'verbose';
} else if (args.quiet) {
  LOG_LEVEL = 'error';
}

const winston = require('winston');
module.exports = new winston.Logger({
  transports: [
    new (winston.transports.Console)({
      level: LOG_LEVEL,
      colorize: true,
      prettyPrint: true
    })
  ],
  exitOnError: false
});
