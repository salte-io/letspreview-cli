'use strict';

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
        console.log(message);
    }
  }

  return {
    LOG_LEVEL,
    setCurrentLevel: setCurrentLevel,
    write: write
  };
})();
