'use strict';

const fetch = require('node-fetch');

(function(fetch) {
    global.fetch = function(input, options) {
        return fetch.call(this, input, options).then(function(response) {
            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        });
    };
})(fetch);

module.exports = global.fetch;
