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

module.exports = (() => {
  const LOG_LEVEL = {
      ERROR: 0,
      SILENT: 1,
      NORMAL: 2,
      VERBOSE: 3
  };
  let currentLogLevel = LOG_LEVEL.NORMAL;

  function setCurrentLevel(value) {
    if (value === LOG_LEVEL.SILENT || value === LOG_LEVEL.NORMAL || value === LOG_LEVEL.VERBOSE) {
      currentLogLevel = value;
    } else {
      throw new Error('Invalid current log level passed!');
    }
  }

  function write(message, level) {
    if (!message || (!level && level !== 0)) {
      throw new Error('Both message and level must be passed!');
    } else if (currentLogLevel >= level) {
        process.stdout.write(message);
    }
  }

  function writeLine(message, level) {
    if (message) {
      message = `${message}\n`;
    }
    write(message, level);
  }

  return {
    LOG_LEVEL,
    setCurrentLevel: setCurrentLevel,
    write: write,
    writeLine: writeLine
  };
})();
