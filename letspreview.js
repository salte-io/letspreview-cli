#!/usr/bin/env node

const LOG_LEVEL = {
    SILENT: 0,
    NORMAL: 1,
    VERBOSE: 2
};
let CURRENT_LOG_LEVEL = LOG_LEVEL.NORMAL;
const yargs = require('yargs').usage('$0 <cmd> <name> [options]')
                              .group(['v', 'h', 'q'], 'Global Options')
                              .option('v', {
                                  alias: 'verbose',
                                  describe: 'Display Debugging Output',
                                  type: 'boolean',
                                  global: true
                              })
                              .help('h', 'Show Help')
                              .alias('h', 'help')
                              .option('q', {
                                  alias: 'quiet',
                                  describe: 'Supress Output',
                                  type: 'boolean',
                                  global: true
                              })
                              .command('publish <name> [options]', 'Pushes the application to letspreview.io.', (yargs) => {
                                return yargs.option('k', {
                                              alias: 'key',
                                              describe: 'The api key used to publish the application.',
                                              type: 'string'
                                            })
                                            .option('d', {
                                              alias: 'directory',
                                              describe: 'The application source directory.',
                                              type: 'string'
                                            })
                                            .demandOption('key')
                              }, _publishApplication)
                              .command('unpublish <name> [options]', 'Removes the application from letspreview.io.', (yargs) => {
                                return yargs.option('k', {
                                              alias: 'key',
                                              describe: 'The api key used to unpublish the application.',
                                              type: 'string'
                                            })
                                            .demandOption('key')
                              }, _unpublishApplication)
                              .demandCommand(1, 'You must specify a command to execute.')
                              .argv;

function _publishApplication(argv) {
    _setLogLevel(argv);
    _log(`Publish called with ${JSON.stringify(argv)}.`, LOG_LEVEL.VERBOSE);
}

function _unpublishApplication(argv) {
    _setLogLevel(argv);
    _log(`Unublish called with ${JSON.stringify(argv)}.`, LOG_LEVEL.VERBOSE);
}

function _setLogLevel(argv) {
    CURRENT_LOG_LEVEL = argv.verbose ? LOG_LEVEL.VERBOSE : CURRENT_LOG_LEVEL;
    CURRENT_LOG_LEVEL = argv.quiet ? LOG_LEVEL.SILENT : CURRENT_LOG_LEVEL;
}

function _log(message, level) {
    if (level <= CURRENT_LOG_LEVEL) {
        console.log(message);
    }
}
