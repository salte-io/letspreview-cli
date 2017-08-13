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

const yargs = require('yargs');
const logger = require('./logger.js');
const PublishCommand = require('./commands/publish.js');
const UnpublishCommand = require('./commands/unpublish.js');

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught exception: ${error}`);
  if (error.stack) {
    logger.error(error.stack);
  }
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  logger.error(`Promise rejection: ${error}`);
  if (error.stack) {
    logger.error(error.stack);
  }
  process.exit(1);
});

yargs.usage('$0 <command> [options ...]')
  .group(['v', 'h', 'q'], 'Global Options')
  .help('h', 'print out helpful usage information')
  .alias('h', 'help')
  .option('v', {
    alias: 'verbose',
    describe: 'turn on debugging output',
    type: 'boolean',
    global: true
  })
  .option('q', {
    alias: 'quiet',
    describe: 'silence output',
    type: 'boolean',
    global: true
  })
  .command('help', 'Shows this help message, or help for a specific command')
  .command(PublishCommand)
  .command(UnpublishCommand)
  .demandCommand(1, 'You must specify a command to execute.').argv;

