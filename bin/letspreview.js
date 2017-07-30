#!/usr/bin/env node

'use strict';

/**
 * @license
 * Copyright (c) 2014 The Let's Preview Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://letspreview.github.io/LICENSE.txt
 * The complete set of authors may be found at http://letspreview.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://letspreview.github.io/CONTRIBUTORS.txt
 * Code distributed by Salte as part of the letspreview project is also
 * subject to an additional IP rights grant found at http://letspreview.github.io/PATENTS.txt
 */
process.title = 'letspreview';

/*
 * NOTE: The contents of this file should work on as many version of Node.js
 * as possible. This means it *can not* use any >ES5 syntax and features.
 * Other files, which may use >=ES2015 syntax, should only be loaded
 * asynchronously after this version check has been performed.
 */

var semver = require('semver');

// Exit early if the user's node version is too low.
if (!semver.satisfies(process.version, '>=6')) {
  console.log(
      'Let\'s Preview CLI requires at least Node v6. ' +
      'You have ' + process.version + '.');
  process.exit(1);
}

// Ok, safe to load ES2015.
require('../index.js');
