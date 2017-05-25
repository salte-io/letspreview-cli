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

require('yargs').usage('$0 <cmd> <name> [options]')
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
    describe: 'Suppress Output',
    type: 'boolean',
    global: true
  })
  .command(require('./lib/console/publishConsole'))
  .command(require('./lib/console/unpublishConsole'))
  .demandCommand(1, 'You must specify a command to execute.').argv;
